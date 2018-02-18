import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  constructor(private api: ApiService, public globals: Globals) {
      this.globals.setTitle( "Wordsire" );
      this.globals.setActiveMenu( "menu" );
   }

  ngOnInit() {
  }

  logout()
  {
      this.api.logout();
  }

}
