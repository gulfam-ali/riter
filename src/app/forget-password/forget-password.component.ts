import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  user = { email: '', code: '', password: '', confirmPassword: '' };
  emailValid: boolean = true;
  forgetForm = FormGroup;
  CodeForm = FormGroup;

  resetCodeInput = false;
  alertMessage = '';
  alertClass = '';

  constructor(private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Forget Password" );
  }

  ngOnInit() {
  }

  recover(){
    console.log(this.user);
    this.api.recoverPassword(this.user).subscribe(res=>{
        if(res['validate']=='true'){
            this.resetCodeInput = true;
            this.alertMessage = res['message'];
            this.alertClass = "alert alert-success";
        }else{
          this.resetCodeInput = false;
          this.alertMessage = res['message'];
          this.alertClass = "alert alert-danger";
        }
        console.log(res);
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
