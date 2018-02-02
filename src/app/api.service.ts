import { Injectable } from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from './spinner.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  api_auth = { user_id: '', token: ''};

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService, private spinnerService: SpinnerService) {
      this.api_auth.user_id = this.cookieService.get('userId');
      this.api_auth.token = this.cookieService.get('token');
  }

  api_post(url, data){
      data.user_id = this.api_auth.user_id;
      data.token = this.api_auth.token;
      return this.http.post('http://localhost/riter/api/' + url, data).map(response => response);
  }

  login(data){
    this.http.post('http://localhost/riter/api/login', data).subscribe(res => {
        console.log(res);
        if(res['validate']=="true")
        {
            this.cookieService.set( 'userId', res['user_id'] );
            this.cookieService.set( 'firstName', res['first_name'] );
            this.cookieService.set( 'lastName', res['last_name'] );
            this.cookieService.set( 'token', res['user_token'] );
            this.spinnerService.clear();
            window.location.href = "feed";
        }
     });
  }

  register(data){
    this.http.post('http://localhost/riter/api/register', data).subscribe(res => {
        if(res['validate']=="true")
        {
            this.spinnerService.add('Setting up your account...');
            var loginData = { email: data.email, password: data.password }
            this.login(loginData);
        }
     });
  }



  changeEmail(data){
      return this.api_post('settings/change-email', data);
  }

  profile(){
      return this.api_post('profile', this.api_auth);
      //return this.http.post('http://localhost/riter/api/profile', this.api_auth).map(response => response)
  }

}
