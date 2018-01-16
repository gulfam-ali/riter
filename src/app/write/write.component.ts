import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  error = { show: 0, message: '' }
  storyRows: number = 5;
  user_id: string;
  token: string;

  story = { title: '', body: '' };
  postForm = FormGroup;


  constructor(private http: HttpClient, private cookieService: CookieService) {
      this.user_id = this.cookieService.get('userId');
      this.token = this.cookieService.get('token');
  }

  ngOnInit() {
  }

  post(){
      console.log(this.story);
      var data = { title: this.story.title, body: this.story.body, user_id: this.user_id, token: this.token}
      this.http.post('http://localhost/riter/api/post/write', data).subscribe(res => {
          if(res['validate']=="true")
          {
            window.location.href = "feed/"+res['post_id'];
          }else{
            this.error.message = "Something went wrong while posting your story. Please try again.";
            this.error.show = 1;
          }
       });

  }

  expandArea(){

      if(this.story.body.split(/\r\n|\r|\n/).length > 4)
      {
        this.storyRows = (this.story.body.split(/\r\n|\r|\n/).length) +1;
      }else{
        this.storyRows = 5;
      }
  }

}
