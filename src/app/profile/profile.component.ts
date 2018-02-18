import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = FormGroup;
  user = { avtar:'', first_name: '', last_name: '', gender: '', tagline:'', bio:'' };

  saveButtonMsg = "Save Changes";
  saving = false;
  processClass = '';
  processMsg = '';

  constructor(private api: ApiService,private router: Router, private route: ActivatedRoute, private cookieService: CookieService, public globals: Globals) {
      this.globals.setTitle( "Edit Profile" );
      this.globals.setActiveMenu( "profile" );
      this.globals.clearErrorMsg();
   }

  ngOnInit() {
        this.api.profile().subscribe(res => {
          this.globals.loading = false;
            if(res['validate']=='true'){
                this.user = res['data']['0'];
                this.globals.userAvtar = this.user.avtar;
            }
            else{
              this.handleApiError(res);
            }
        },
        error =>{
         this.handleApiError(error);
       });
   }

   saveInfo(){
     this.saveButtonMsg = "Saving...";
     this.saving = true;
     this.api.saveProfile(this.user).subscribe(res => {
       this.saveButtonMsg = "Save Changes";
       this.saving = false;
           if(res['validate']=='true'){
               this.processClass = "alert alert-success";
               this.processMsg = "Success";
           }
           else{
             this.processClass = "alert alert-danger";
             this.processMsg = "Failed";
           }
       },
       error =>{
         this.processClass = "alert alert-danger";
         this.processMsg = "Oops! Something went wrong";
      });
   }

   handleApiError(error: any){
     this.globals.loading = false;
     this.globals.error = true;

     if(error.status == 0)
     {
       this.globals.errorMessage = this.globals.errorCodes.network;
       this.globals.errorDescription = this.globals.errorCodes.network_des;
     }else{
       this.globals.errorMessage = this.globals.errorCodes.oops;
       this.globals.errorDescription = this.globals.errorCodes.oops_des;
     }
   }

}
