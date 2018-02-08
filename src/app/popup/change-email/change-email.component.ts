import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  user = { email: '', password: '' };
  currentEmail = '';
  changeEmailForm = FormGroup;

  ButtonMsg = 'Update Email';
  alertMessage = '';
  alertClass = '';

  constructor(private cookieService: CookieService, private api: ApiService) {
      this.currentEmail = this.cookieService.get( 'email');
  }

  ngOnInit() {
  }

  changeEmail(form){
    this.ButtonMsg = "Updating...";
    this.api.changeEmail(this.user).subscribe(res => {
      if(res['validate']=='true'){
          this.cookieService.set( 'email', this.user.email);
          this.currentEmail = this.user.email;
          this.alertClass= "alert alert-success";
          this.alertMessage = 'Email is successfully changed. Please verify this email in settings.';
          this.ButtonMsg = "Update Email";
          form.reset();
      }else{
        this.alertClass= "alert alert-danger";
        this.alertMessage = res['message'];
        this.ButtonMsg = "Update Email";
      }
    });

  }

  resetForm(form){
    form.reset();
    this.alertMessage = '';
    this.alertClass = '';
  }

}
