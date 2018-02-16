import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
  pagination = { offset: 0, items: 5 };
  total_records: string[];
  posts = [];
  stop_fetching = false;

  constructor(private globals: Globals, private api: ApiService) {
      this.globals.setTitle( "Wordsire" );
      this.globals.setActiveMenu('');
      this.globals.clearErrorMsg();

      this.api.pagination.offset = 0;
  }

  ngOnInit() {
      this.api.guestfeed().subscribe(res => {
        this.globals.loading = false;
          if(res['validate'] == 'true')
          {
            this.total_records = res['total_records'];
            this.posts = res['data'];
            this.pagination.offset = 5;
          }
          else if(res['validate']=="empty")
          {
              this.globals.error = true;
              this.globals.errorMessage = this.globals.errorCodes.zero_feed;
              this.globals.errorDescription = this.globals.errorCodes.zero_feed_des;
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

    this.api.guestfeed().subscribe(res => {
          this.globals.loading = false;
          if(res['validate'] == 'true'){
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
