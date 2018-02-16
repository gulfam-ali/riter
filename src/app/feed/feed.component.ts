import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  user_id: string;
  token: string;
  stop_fetching = false;
  total_records: string[];
  posts = [];
  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');
      this.globals.setTitle( "Feed" );
      this.globals.setActiveMenu( "feed" );
      this.globals.clearErrorMsg();

      this.api.pagination.offset = 0;
      this.api.getNotifsCount();
  }

  ngOnInit() {
      this.api.feed().subscribe(res => {
          this.globals.loading = false;
          if(res['validate']=="true")
          {
              this.total_records = res['total_records'];
              this.posts = res['data'];
              this.api.pagination.offset = 5;
          }
          else{
            this.globals.error = true;
            this.globals.errorMessage = this.globals.errorCodes.zero_feed;
            this.globals.errorDescription = this.globals.errorCodes.zero_feed_des;
          }
       },
       error =>{
        this.handleApiError(error);
      });
  }

  handleApiError(error: any){
    this.stop_fetching = true;
    this.globals.loading = false;
    this.globals.error = true;

    if(error.status == 0)
    {
      this.globals.errorMessage = this.globals.errorCodes.network;
      this.globals.errorDescription = this.globals.errorCodes.network_des;
    }else{
      this.globals.errorMessage = this.globals.errorCodes.oops;
      this.globals.errorDescription = this.globals.errorCodes.oops_des;
    }
  }

  loadMoreStories(){
    this.globals.loading = true;
    this.stop_fetching = false;

    this.api.feed().subscribe(res => {
        this.globals.loading = false;
        if(res['validate']=="true")
        {
            for(let post of res['data']){
                this.posts.push(post);
            }
            this.api.pagination.offset+= 5;
        }
        else if(res['validate'] == 'empty'){
            this.stop_fetching = true;
        }
    },
     error =>{
       this.handleApiError(error);
     });
  }

  public handleScroll(event) {
    if (event.isReachingBottom) {
        if(!this.globals.loading && !this.stop_fetching){
          this.globals.loading = true;
          this.loadMoreStories();
        }
    }
  }

  togglePostLike(post_id){
    var post_key;
    for (let key in this.posts) {
        if(this.posts[key].id == post_id)
        {
          post_key = key;
          this.posts[key].liked = (this.posts[key].liked==1)?0:1;
          this.posts[key].likes = (this.posts[key].liked==1)? (Number(this.posts[key].likes)+1) : (Number(this.posts[key].likes)-1) ;
        }
    }

    var data = { post_id: post_id }
    this.api.toggleLike(data).subscribe(res => {
        if(res['validate']!='true')
        {
            this.posts[post_key].liked = (this.posts[post_key].liked)?0:1;
            this.posts[post_key].likes = (this.posts[post_key].liked==1)? (Number(this.posts[post_key].likes)+1) : (Number(this.posts[post_key].likes)-1) ;
        }
     });
  }

}
