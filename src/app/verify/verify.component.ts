import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  CodeForm = FormGroup;
  verified = false;
  user = { code: ''};

  buttonMsg = "Verify Email";
  codebuttonMsg = "Resend Code";

  processClass = '';
  processMsg = '';

  constructor(private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Verify Email Address | Wordsire" );
      this.globals.clearErrorMsg();
  }

  ngOnInit() {
    this.api.checkVerify().subscribe(res=>{
      this.globals.loading = false;
        if(res['validate']=='true'){
            this.verified = true;
        }
        else if(res['validate']=='empty'){
          this.verified = false;
        }else{
            this.globals.handleApiError(res);
        }
    },
      error =>{
       this.globals.handleApiError(error);
     });
  }

  sendCode(){
    this.codebuttonMsg = "Sending...";
    this.api.sendVerificationCode().subscribe(res=>{
      this.codebuttonMsg = "Resend Code";
      if(res['validate']=='true'){
            this.processClass = "alert alert-success";
            this.processMsg = "Code has been sent to your email address";
        }
        else{
          this.processClass = "alert alert-danger";
          this.processMsg = "Code cannot be sent at the moment.";
        }

    });
  }

  verify(){
    this.buttonMsg = "Verifying...";
    this.api.verifyEmail(this.user).subscribe(res=>{
      this.buttonMsg = "Verify Email";
        if(res['validate']=='true'){
            this.verified = true;
        }
        else{
            this.processClass = "alert alert-danger";
            this.processMsg = "Incorrect Verification Code";
        }

    },
      error =>{
       this.globals.handleApiError(error);
     });
  }

}
