import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent implements OnInit {
  sidebar = { feed: '', bookmarks: '', profile:'', notifications: '', myStories:'active', settings:''};
  user_id: string;
  token: string;
  total_records: string[];
  validate: string[];
  posts = [];
  constructor( private http: HttpClient, private cookieService: CookieService) {
    this.user_id = this.cookieService.get('userId');
    this.token = this.cookieService.get('token');

    this.sidebar.myStories = 'active';
  }

  ngOnInit() {
    var data = { user_id: this.user_id, token: this.token }
     this.http.post('http://localhost/riter/api/feed/mystories', data).subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });
  }

}
