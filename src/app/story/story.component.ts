import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  story_id: number;
  total_records: string[];
  validate: string[];
  posts = [];
  constructor( private http: HttpClient, private route: ActivatedRoute) {
      this.route.params.subscribe( params => {
          this.story_id = params.id;
      });
  }

  ngOnInit() {
     this.http.get('http://localhost/riter/api/feed/'+this.story_id).subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'][0];

          console.log(this.posts)
      });
  }

}
