import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
  pagination = { offset: 0, items: 5 };
  total_records: string[];
  validate: string[];
  posts = [];
  loading_post = true;
  stop_fetching = false;

  constructor(private globals: Globals, private api: ApiService) {
      this.globals.setTitle( "Wordsire" );
      this.api.pagination.offset = 0;
  }

  ngOnInit() {
      this.api.guestfeed().subscribe(res => {
           this.loading_post = false;
           this.validate = res['validate'];
           this.total_records = res['total_records'];
           this.posts = res['data'];

           this.pagination.offset = 5;
       });

  }

  loadMoreStories(){
    this.api.pagination.offset = this.pagination.offset;

    this.api.guestfeed().subscribe(res => {
          if(res['validate'] == 'true'){
              this.loading_post = false;
              this.validate = res['validate'];

              for(let post of res['data']){
                  this.posts.push(post);
              }

              this.pagination.offset+=5;
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
