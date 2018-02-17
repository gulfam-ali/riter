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

  profile = {
    id:'',
    avtar:'default.png',
    first_name:'',
    last_name:'',
    email:'',
    reader_points:'',
    writer_points:'',
    registered_date:'',
    active:'',
    likes:'',
    bookmarks:'',
    comments:'',
    views:'',
    posts:'',
    follow: 0
  };

  user = { firstName: '', lastName: '' };

  selfProfile = true;
  data = { member_id: '' };

  loadErrorMsg = 'Refresh';
  notFound = false;
  loading_post = true;
  refresh_post = false;

  constructor(private api: ApiService,private router: Router, private route: ActivatedRoute, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "Profile" );
      this.globals.setActiveMenu( "profile" );

      this.data.member_id = this.cookieService.get('userId');

      this.route.params.subscribe( params => {
        if(params.id!= null){
            if ( !isNaN(params.id) && Number(+params.id)) {
                if(params.id == this.data.member_id)
                {
                  this.router.navigate(['profile']);
                }else{
                  this.data.member_id = params.id;
                  this.selfProfile = false;
                }

            }else{
              this.router.navigate(['profile']);
            }
        }
      });
   }

  ngOnInit() {
      this.api.profile(this.data).subscribe(res => {
          this.loading_post = false;
          if(res['validate']=='true'){
              this.profile = res['data']['0'];
              this.profile.follow = +res['data']['0']['follow'];
              this.globals.setTitle( this.profile.first_name+' '+this.profile.last_name );

              this.globals.userAvtar = this.profile.avtar;
          }else{
            this.notFound = true;
          }
      },
      error =>{
       this.handleApiError(error);
     });
 }

   handleApiError(error: any){
     this.loading_post = false;
     this.refresh_post = true;
     if(error.status == 0)
     {
       console.log('No Internet Connection');
       this.loadErrorMsg = "No Internet Connection";
     }else{
       this.loadErrorMsg = "Oops! Something went wrong";
     }
   }

    toggleFollow(){
      this.profile.follow = (this.profile.follow)?0:1;

      this.api.toggleFollow(this.data).subscribe(res => {
        console.log(res)
          if(res['validate']=='true'){
              console.log('Operation Success');
          }else{
            this.profile.follow = (this.profile.follow)?0:1;
          }
      });
    }

}
