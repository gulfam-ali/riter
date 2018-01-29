import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ApiService } from '../api.service';
=======
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

<<<<<<< HEAD
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

  constructor(private api: ApiService) { }

  ngOnInit() {
      this.api.profile().subscribe(res => {
        console.log(res)
        if(res['validate']=='true'){
          this.profile = res['data']['0'];
          console.log(this.profile)
        }
      });

=======
  constructor() { }

  ngOnInit() {
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49
  }

}
