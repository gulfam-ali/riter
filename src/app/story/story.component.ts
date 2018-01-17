import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  storyRows: number = 1;
  comment = { postId: '', text: '' };
  commentForm = FormGroup;
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
    bookmarked: 0,
    likes: 0,
    modified_date:"",
    post_date : "",
    title : "" ,
    user_id : "" ,
    views : 0
  };

  commentArr = [];
  comments_returned: number = 0;
  comments_offset: number = 0;

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
          this.comment.postId = this.posts.id;

          this.commentArr = res['comments']['commentsArr'];
          this.comments_returned = res['comments']['comments_returned'];
          this.comments_offset = 5;
      });
  }

  bookmark(){
    this.posts.bookmarked = (this.posts.bookmarked==1)?0:1;
    var data = { user_id: this.user_id, token:this.token, post_id: this.posts.id }
    this.http.post('http://localhost/riter/api/post/bookmark', data).subscribe(res => {
        if(res['validate']!='true')
        {
            this.posts.bookmarked = (this.posts.bookmarked)?0:1;
        }
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

  postComment(){

      this.comment.text = this.comment.text.trim();
      if(this.comment.text.length < 1)
      {
        return false;
      }
      var data = { user_id: this.user_id, token:this.token, post_id: this.comment.postId, comment: this.comment.text }
      this.http.post('http://localhost/riter/api/post/comment', data).subscribe(res => {
          if(res['validate']=='true')
          {
              this.comment.text = '';

              this.posts.comments++;
              this.comments_offset = 0;
              this.refreshComments();
          }
       });
  }

  refreshComments(){
    var data = { user_id: this.user_id, token:this.token, post_id: this.comment.postId, offset: this.comments_offset }
    this.http.post('http://localhost/riter/api/post/loadcomments', data).subscribe(res => {
        if(res['comments_returned'] > 0)
        {
            this.comments_offset = this.comments_offset+5;
            this.commentArr = res['commentsArr'];
        }else{

        }
     });
  }

  loadMoreComments(){
    var data = { user_id: this.user_id, token:this.token, post_id: this.comment.postId, offset: this.comments_offset }
    this.http.post('http://localhost/riter/api/post/loadcomments', data).subscribe(res => {
        if(res['comments_returned'] > 0)
        {
            this.comments_offset = this.comments_offset+5;

            for(let arr of res['commentsArr']){
                this.commentArr.push(arr);
            }

            console.log(this.commentArr)
        }else{

        }
     });
  }

  expandArea($event){

      if(this.comment.text.split(/\r\n|\r|\n/).length > 1)
      {
        this.storyRows = (this.comment.text.split(/\r\n|\r|\n/).length);
      }else{
        this.storyRows = 1;
      }
  }

}
