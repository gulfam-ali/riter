import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  total_records: string[];
  validate: string[];
  posts = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.http.get('http://localhost/riter/api/feed').subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });

  }

}
