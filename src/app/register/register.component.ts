import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
  emailValid: boolean = true;
  registerForm = FormGroup;

  constructor(private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Register" );
      this.globals.setActiveMenu('register');
  }

  ngOnInit(){

  }

  register(){
      if(!this.validateEmail(this.user.email))
      {
        this.emailValid = false;
        return false;
      }else{ this.emailValid = true; }

      this.api.register(this.user).subscribe(res => {
          if(res['validate']=="true")
          {
              this.globals.showLoad('Setting up your account...');
              var loginData = { email: this.user.email, password: this.user.password }
              this.api.login(loginData);
          }
       });
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
