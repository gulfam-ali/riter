import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  sidebar = { feed: 'active', bookmarks: '', profile:'', notifications: '', myStories:'', settings:''};
  user_id: string;
  token: string;
  total_records: string[];
  validate: string[];
  posts = [];
  constructor( private http: HttpClient, private cookieService: CookieService, private globals: Globals) {
    this.user_id = this.cookieService.get('userId');
    this.token = this.cookieService.get('token');
    this.globals.title = "Feed";
  }

  ngOnInit() {
    var data = { user_id: this.user_id, token: this.token }
     this.http.post(this.globals.apiUrl+'/feed', data).subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });

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

    var data = { user_id: this.user_id, token:this.token, post_id: post_id }
    this.http.post(this.globals.apiUrl + '/post/like', data).subscribe(res => {
        if(res['validate']!='true')
        {
            this.posts[post_key].liked = (this.posts[post_key].liked)?0:1;
            this.posts[post_key].likes = (this.posts[post_key].liked==1)? (Number(this.posts[post_key].likes)+1) : (Number(this.posts[post_key].likes)-1) ;
        }
     });
  }

}
