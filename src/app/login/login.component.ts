import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = { email: '', password: '' };
  loginForm = FormGroup;

  constructor(private cookieService: CookieService, private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Login" );
  }
  ngOnInit() {
  }

  login(){
    this.api.login(this.user).subscribe(res => {
          if(res['validate']=="true")
          {
              this.cookieService.set( 'userId', res['user_id'] );
              this.cookieService.set( 'firstName', res['first_name'] );
              this.cookieService.set( 'lastName', res['last_name'] );
              this.cookieService.set( 'token', res['user_token'] );
              this.globals.hideLoad();
              window.location.href = "feed";
          }
     });
  }

}
