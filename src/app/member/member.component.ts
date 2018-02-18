import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Globals } from '../globals';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  profile = {
    id:'',
    avtar:'default.png',
    first_name:'',
    last_name:'',
    tagline: '',
    bio: '',
    reader_points:'',
    writer_points:'',
    registered_date:'',
    views: 0,
    posts: 0,
    follow: 0,
    followers: 0
  };
  posts = [];

  selfProfile = true;
  data = { username: '', member_id: '', user_id: '' };
  share_link: SafeUrl;

  stop_fetching = false;

  constructor(private api: ApiService,private router: Router, private route: ActivatedRoute, private cookieService: CookieService, public globals: Globals) {
      this.globals.setTitle( "Profile" );
      this.globals.setActiveMenu( "profile" );
      this.globals.clearErrorMsg();

      this.api.pagination.offset = 0;
      this.api.getNotifsCount();

      this.data.username = this.cookieService.get('username');
      this.data.user_id = this.cookieService.get('userId');

      this.route.params.subscribe( params => {
        if(params.username!= null){
            if ( params.username != '') {
                if(params.username != this.data.username)
                {
                  this.data.username = params.username;
                  this.selfProfile = false;

                  this.selfProfile = (params.username == this.data.user_id)?true:false;
                }

            }else{
              this.router.navigate(['feed']);
            }
        }
      });
   }

  ngOnInit() {
    this.memberData();
  }

  memberData(){
    this.api.memberProfile(this.data).subscribe(res => {

        if(res['validate']=='true'){
            this.profile = res['data']['0'];
            this.profile.follow = +res['data']['0']['follow'];
            this.globals.setTitle( this.profile.first_name+' '+this.profile.last_name+' | Wordsire' );
            this.data.member_id = this.profile.id;
            this.memberStories();

            this.share_link = this.globals.sanitize('whatsapp://send?text=https://wordsire.com/'+this.data.username);
        }else{
          this.globals.loading = false;
          this.globals.error = true;
          this.globals.errorMessage = this.globals.errorCodes.error_404;
          this.globals.errorDescription = this.globals.errorCodes.error_404_des;
          this.globals.setTitle( "Error 404 | Page Not Found" );
        }
    },
    error =>{
     this.handleApiError(error);
   });
  }

  memberStories(){
    this.globals.loading = true;
    this.stop_fetching = false;

    this.api.memberStories(this.data).subscribe(res => {
      this.globals.loading = false;
      if(res['validate']=="true")
      {
          this.posts = res['data'];
          this.api.pagination.offset = 5;
      }
      else if(res['validate'] == 'empty'){
          this.stop_fetching = true;
      }
    },
    error =>{
     this.handleApiError(error);
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

  toggleFollow(){
      this.profile.follow = (this.profile.follow)?0:1;

      this.api.toggleFollow(this.data).subscribe(res => {
          if(res['validate']=='true'){
              console.log('Operation Success');
          }else{
            this.profile.follow = (this.profile.follow)?0:1;
          }
      });
    }

    handleScroll(event) {

      if (event.isReachingBottom) {
          if(!this.globals.loading && !this.stop_fetching){
            this.globals.loading = true;
            this.memberStories();
          }

        }
    }


}
