import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
  emailValid: boolean = true;
  registerForm = FormGroup;

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(){

  }

  register(){
      if(!this.validateEmail(this.user.email))
      {
        this.emailValid = false;
        return false;
      }else{ this.emailValid = true; }

      this.api.register(this.user);
  }

  checkEmail(){
    if(!this.validateEmail(this.user.email))
    {
      this.emailValid = false;
    }else{ this.emailValid = true; }
  }

  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
  }

}
