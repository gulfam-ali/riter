import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  user = { oldPassword: '', newPassword: '', cnfNewPassword: '' };
  changePasswordForm = FormGroup;

  constructor() { }

  ngOnInit() {
  }

  changePassword(){
    console.log(this.user);
  }

}
