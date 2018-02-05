import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent implements OnInit {
  user_id: string;
  token: string;
  total_records: string[];
  validate: string[];
  posts = [];
  loading_post = true;
  stop_fetching = false;
  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "My Stories" );
      this.globals.setActiveMenu( "myStories" );
      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');

      this.api.pagination.offset = 0;
  }

  ngOnInit() {
      this.api.user_stories().subscribe(res => {
          if(res['validate']=="true")
          {
              this.loading_post = false;
              this.total_records = res['total_records'];
              this.posts = res['data'];

              this.api.pagination.offset = 5;
          }
      });
  }

  loadMoreStories(){
    this.api.user_stories().subscribe(res => {
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
