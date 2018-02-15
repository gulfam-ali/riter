import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

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
  zero_stories = false;

  selfProfile = true;
  data = { username: '' };

  loadErrorMsg = 'Refresh';
  notFound = false;
  loading_post = true;
  refresh_post = false;

  constructor(private api: ApiService,private router: Router, private route: ActivatedRoute, private cookieService: CookieService, private globals: Globals) {
      this.globals.setTitle( "Profile" );
      this.globals.setActiveMenu( "profile" );

      this.data.username = this.cookieService.get('username');

      this.route.params.subscribe( params => {
        if(params.username!= null){
            if ( params.username != '') {
                if(params.username != this.data.username)
                {
                  this.data.username = params.username;
                  this.selfProfile = false;
                }
            }else{
              this.router.navigate(['feed']);
            }
        }
      });
   }

  ngOnInit() {
    console.log(this.data);
    this.memberData();
    this.memberStories();


  }

  memberData(){
    this.api.memberProfile(this.data).subscribe(res => {
        this.loading_post = false;
        if(res['validate']=='true'){
            this.profile = res['data']['0'];
            this.profile.follow = +res['data']['0']['follow'];
            this.globals.setTitle( this.profile.first_name+' '+this.profile.last_name+' | Wordsire' );
        }else{
          this.notFound = true;
        }
    },
    error =>{
     this.handleApiError(error);
   });
  }

  memberStories(){
    this.api.memberStories(this.data).subscribe(res => {
      this.loading_post = false;
      if(res['validate']=="true")
      {
          this.posts = res['data'];
          this.api.pagination.offset = 5;
      }else{
        this.zero_stories = true;
      }
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
