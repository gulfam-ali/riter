import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
<<<<<<< HEAD
import { ApiService } from '../api.service';
=======
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = { email: '', password: '' };
  loginForm = FormGroup;

<<<<<<< HEAD
  constructor(private http: HttpClient, private cookieService: CookieService, private api: ApiService) { }
=======
  constructor(private http: HttpClient, private cookieService: CookieService) { }
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49

  ngOnInit() {
  }

  login(){
<<<<<<< HEAD
      this.api.login(this.user);
=======
      console.log(this.user);

      this.http.post('http://localhost/riter/api/login', this.user).subscribe(res => {
          console.log(res);
          if(res['validate']=="true")
          {
              this.cookieService.set( 'userId', res['user_id'] );
              this.cookieService.set( 'token', res['user_token'] );
              window.location.href = "feed";
          }
       });

>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49
  }

}
