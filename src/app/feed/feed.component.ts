import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  user_id: string;
  token: string;
  loading_post = true;
  stop_fetching = false;
  refresh_post = false;
  total_records: string[];
  posts = [];
  loadErrorMsg = 'Refresh';
  zero_stories = false;
  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');
      this.globals.setTitle( "Feed" );
      this.globals.setActiveMenu( "feed" );

      this.api.pagination.offset = 0;
      this.api.getNotifsCount();
  }

  ngOnInit() {
      this.api.feed().subscribe(res => {
          this.loading_post = false;
          if(res['validate']=="true")
          {


              this.total_records = res['total_records'];
              this.posts = res['data'];

              this.api.pagination.offset = 5;
          }else{
            this.zero_stories = true;
          }
       },
       error =>{
        this.handleApiError(error);
      });
  }

  handleApiError(error: any){
    this.loading_post = false;
    this.stop_fetching = true;
    if(error.status == 0)
    {
      console.log('No Internet Connection');
      this.refresh_post = true;
      this.loading_post = false;
      this.loadErrorMsg = "No Internet Connection";
    }
  }

  loadMoreStories(){
    this.refresh_post = false;
    this.loading_post = true;
    this.stop_fetching = false;

    this.api.feed().subscribe(res => {
        this.loading_post = false;

        if(res['validate']=="true")
        {
            for(let post of res['data']){
                this.posts.push(post);
            }
            this.api.pagination.offset+= 5;
        }
        else if(res['validate'] == 'empty'){
            this.loading_post = false;
            this.stop_fetching = true;
        }

    },
     error =>{
       this.handleApiError(error);
     });
  }

  public handleScroll(event) {
    if (event.isReachingBottom) {
        if(!this.loading_post && !this.stop_fetching){
          this.loading_post = true;
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
