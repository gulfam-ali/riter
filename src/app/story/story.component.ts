import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  user_id: string;
  token: string;
  story_id: number;
  total_records: string[];
  validate: string[];
  posts = {
    body:"",
    comments: 0,
    first_name: "",
    last_name:"",
    id:"",
    is_deleted:"",
    liked: 0,
    likes: 0,
    modified_date:"",
    post_date : "",
    title : "" ,
    user_id : "" ,
    views : 0
  };
  constructor( private http: HttpClient, private route: ActivatedRoute, private cookieService: CookieService) {
    this.user_id = this.cookieService.get('userId');
    this.token = this.cookieService.get('token');

      this.route.params.subscribe( params => {
          this.story_id = params.id;
      });
  }

  ngOnInit() {
      var data = { user_id: this.user_id, post_id:this.story_id,  token: this.token }
     this.http.post('http://localhost/riter/api/post/read', data).subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'][0];
      });
  }

  togglePostLike(post_id){
    this.posts.liked = (this.posts.liked==1)?0:1;
    this.posts.likes = (this.posts.liked==1)? (Number(this.posts.likes)+1) : (Number(this.posts.likes)-1) ;

    var data = { user_id: this.user_id, token:this.token, post_id: post_id }
    this.http.post('http://localhost/riter/api/post/like', data).subscribe(res => {
        if(res['validate']!='true')
        {
            this.posts.liked = (this.posts.liked)?0:1;
            this.posts.likes = (this.posts.liked==1)? (Number(this.posts.likes)+1) : (Number(this.posts.likes)-1) ;
        }
     });
  }

}
