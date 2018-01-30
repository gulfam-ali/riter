import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
  total_records: string[];
  validate: string[];
  posts = [];
  loading_post = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.http.get('http://localhost/riter/api/guestfeed').subscribe(res => {
          this.loading_post = false;
          this.validate = res['validate'];
          this.total_records = res['total_records'];
          this.posts = res['data'];
      });

  }


}
