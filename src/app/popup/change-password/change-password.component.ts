import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  user = { oldPassword: '', newPassword: '', cnfNewPassword: '' };
  changePasswordForm = FormGroup;

  ButtonMsg = 'Change Password';
  alertMessage = '';
  alertClass = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  changePassword(form){
    console.log(this.user);

      this.ButtonMsg = "Changing...";
      this.api.changePassword(this.user).subscribe(res => {
        if(res['validate']=='true'){
            this.alertClass= "alert alert-success";
            this.alertMessage = res['message'];
            this.ButtonMsg = "Change Password";
            form.reset();
        }else{
          this.alertClass= "alert alert-danger";
          this.alertMessage = res['message'];
          this.ButtonMsg = "Change Password";
        }
      });
  }

  resetForm(form){
    form.reset();
    this.alertMessage = '';
    this.alertClass = '';
  }

}
