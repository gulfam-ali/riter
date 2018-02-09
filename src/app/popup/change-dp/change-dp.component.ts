import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-dp',
  templateUrl: './change-dp.component.html',
  styleUrls: ['./change-dp.component.scss']
})
export class ChangeDpComponent implements OnInit {

  user = { avtar: null};

  changeAvtarForm = FormGroup;

  ButtonMsg = 'Upload';
  alertMessage = '';
  alertClass = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
      this.user.avtar = files.item(0);
  }

  private prepareSave(): any {
     let input = new FormData();

     input.append('avatar', this.user.avtar);
     return input;
 }

  changeAvtar(){
    this.ButtonMsg = "Uploading...";
    const formModel = this.prepareSave();
    this.api.changeAvtar(this.user).subscribe(res => {
      if(res['validate']=='true'){
          this.alertClass= "alert alert-success";
          this.alertMessage = 'Email is successfully changed. Please verify this email in settings.';
          this.ButtonMsg = "Upload";
          this.user.avtar = null;
      }else{
        this.alertClass= "alert alert-danger";
        this.alertMessage = res['message'];
        this.ButtonMsg = "Upload";
      }
    });
  }



}
