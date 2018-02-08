import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  sidebar = { feed: 'active', bookmarks: '', profile:'', notifications: '', myStories:'', settings:''};
  user_id: string;
  token: string;
  loading_post = true;
  stop_fetching = false;
  zero_stories = false;
  refresh_post = false;
  total_records: string[];
  validate: string[];
  posts = [];

  loadErrorMsg = 'Refresh';

  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "Bookmarks" );
      this.globals.setActiveMenu( "bookmarks" );

      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');

      this.api.pagination.offset = 0;
  }

  ngOnInit() {
      this.api.bookmarksFeed().subscribe(res => {
          this.loading_post = false;
           if(res['validate']=="true")
           {

               this.total_records = res['total_records'];
               this.posts = res['data'];

               this.api.pagination.offset = 5;
           }
           else if(res['validate']=="empty")
           {

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

    this.api.bookmarksFeed().subscribe(res => {
        if(res['validate']=="true")
        {
            this.loading_post = false;

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

}
