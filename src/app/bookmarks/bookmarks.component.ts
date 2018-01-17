import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  sidebar = { feed: 'active', bookmarks: '', profile:'', notifications: '', myStories:'', settings:''};
  user_id: string;
  token: string;
  total_records: string[];
  validate: string[];
  posts = [];
  constructor( private http: HttpClient, private cookieService: CookieService) {
    this.user_id = this.cookieService.get('userId');
    this.token = this.cookieService.get('token');
  }

  ngOnInit() {
    var data = { user_id: this.user_id, token: this.token }
     this.http.post('http://localhost/riter/api/feed/bookmark', data).subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });

  }

}
