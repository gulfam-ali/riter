import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
    posts:''
  };

  constructor(private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Profile" );
      this.globals.setActiveMenu( "profile" );
   }

  ngOnInit() {
      this.api.profile().subscribe(res => {
          if(res['validate']=='true'){
              this.profile = res['data']['0'];
              this.globals.setTitle( this.profile.first_name+' '+this.profile.last_name );
          }
      });
    }

}
