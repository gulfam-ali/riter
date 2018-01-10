import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  total_records: string[];
  validate: string[];
  posts = [];
  constructor(private authService: AuthenticateService, private http: HttpClient) {

      if(!this.authService.authorise())
      {
        window.location.href = "login";
      }
  }

  ngOnInit() {
     this.http.get('http://localhost/riter/api/feed').subscribe(res => {
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });

  }

}
