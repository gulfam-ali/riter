import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';

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
  constructor(private globals: Globals, private api: ApiService) {
      this.globals.setTitle( "Wordsire" );
  }

  ngOnInit() {
    this.api.guestfeed().subscribe(res => {
           this.loading_post = false;
           this.validate = res['validate'];
           this.total_records = res['total_records'];
           this.posts = res['data'];
       });

  }


}
