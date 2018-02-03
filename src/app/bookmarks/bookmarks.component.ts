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
  total_records: string[];
  validate: string[];
  posts = [];
  constructor(private api: ApiService, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "Bookmarks" );
      this.globals.setActiveMenu( "bookmarks" );

      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');
  }

  ngOnInit() {

      this.api.bookmarksFeed().subscribe(res => {
           this.validate = res['validate'];
           this.total_records = res['total_records'];
           this.posts = res['data'];
       });

  }

}
