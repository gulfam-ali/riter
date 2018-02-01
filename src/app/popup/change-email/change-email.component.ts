import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  user = { email: '', password: '' };
  changeEmailForm = FormGroup;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  changeEmail(){
    console.log(this.user);

    this.api.changeEmail(this.user).subscribe(res => {
      console.log(res)
      if(res['validate']=='true'){

      }
    });

  }

}
