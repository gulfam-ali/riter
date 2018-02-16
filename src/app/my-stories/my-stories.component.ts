import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';
import { LoaderComponent } from '../loader/loader.component';

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
  stop_fetching = false;

  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "My Stories" );
      this.globals.setActiveMenu( "myStories" );
      this.globals.clearErrorMsg();

      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');

      this.api.pagination.offset = 0;
  }

  ngOnInit() {
      this.api.user_stories().subscribe(res => {
          this.globals.loading = false;
          if(res['validate']=="true")
          {
              this.total_records = res['total_records'];
              this.posts = res['data'];
              this.api.pagination.offset = 5;
          }
          else if(res['validate']=="empty")
          {
              this.globals.error = true;
              this.globals.errorMessage = this.globals.errorCodes.zero_write;
              this.globals.errorDescription = this.globals.errorCodes.zero_write_des;
          }else{
            this.handleApiError(res);
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

    this.api.user_stories().subscribe(res => {
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

}
