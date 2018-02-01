import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  user = { email: '', password: '' };
  changeEmailForm = FormGroup;

  constructor() { }

  ngOnInit() {
  }

  changeEmail(){
    console.log(this.user);
  }

}
