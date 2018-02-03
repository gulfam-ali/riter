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
  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "My Stories" );
      this.globals.setActiveMenu( "myStories" );
      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');
  }

  ngOnInit() {
      this.api.user_stories().subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });
  }

}
