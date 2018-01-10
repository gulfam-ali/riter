import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = { email: '', password: '' };
  loginForm = FormGroup;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login(){
      console.log(this.user);

      this.http.post('http://localhost/riter/api/login', this.user).subscribe(res => {
          console.log(res);
          if(res.validate=="true")
          {
              this.cookieService.set( 'userId', res.user_id );
              this.cookieService.set( 'token', res.token );
              window.location.href = "feed";
          }
       });

  }

}
