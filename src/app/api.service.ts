import { Injectable } from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from './globals';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  api_auth = { user_id: '', token: ''};

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private globals: Globals) {
      this.api_auth.user_id = this.cookieService.get('userId');
      this.api_auth.token = this.cookieService.get('token');
  }

//Common Methods
  api_get(url){
      return this.http.get(this.globals.apiUrl+url).map(response => response);
  }

  api_post(url, data = null){
      if(data == null)
      {
        data = this.api_auth;
      }else{
        data.user_id = this.api_auth.user_id;
        data.token = this.api_auth.token;
      }

      return this.http.post(this.globals.apiUrl+url, data).map(response => response);
  }

//Login Component
  login(data){
      return this.api_post('login', data);
  }

//Register Component
  register(data){
      return this.api_post('register', data);
  }

//Settings Component
  changeEmail(data){
      return this.api_post('settings/change-email', data);
  }


//Guest Feed Component
  guestfeed(){
      return this.api_get('guestfeed');
  }

//Member Feed Component
  feed(){
      return this.api_post('feed');
  }

//Bookmarks Component
  bookmarksFeed(){
      return this.api_post('feed/bookmark');
  }

//My Stories Component

  user_stories(){
      return this.api_post('feed/mystories');
  }

//Story Component
  readStory(data){
      return this.api_post('post/read', data);
  }

  bookmarkStory(data){
      return this.api_post('post/bookmark', data);
  }

  toggleLike(data){
      return this.api_post('post/like', data);
  }

  comment(data){
      return this.api_post('post/comment', data);
  }

  loadComments(data){
      return this.api_post('post/loadcomments', data);
  }

//Write Story component
  writeStory(data){
      return this.api_post('post/write', data);
  }

//Profile Component
  profile(){
      return this.api_post('profile');
  }

}
