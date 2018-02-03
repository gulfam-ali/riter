import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private globals: Globals) {
      this.globals.setTitle( "Notifications" );
      this.globals.setActiveMenu( "notifications" );
  }

  ngOnInit() {
  }

}
