import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications = {
    id: '',
    user_id: '',
    avtar: 'default.png',
    first_name: '',
    last_name: '',
    event: '',
    reference_id: '',
    reference_name: '',
    seen: '',
    notification_date: ''

  };
  emptyRec = false;

  constructor(private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Notifications" );
      this.globals.setActiveMenu( "notifications" );
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(){
      this.api.getNotifications().subscribe(res => {
          if(res['validate']=='true')
          {
              this.notifications = res['data'];
              this.globals.newNotifs = res['unseen_count'];
          }else{
              this.emptyRec = true;
          }
      });
  }

  notif_read(){
    this.api.notifRead().subscribe(res => {
        if(res['validate']=='true')
        {
            this.notifications = res['data'];
            this.globals.newNotifs = res['unseen_count'];
        }else{
          this.emptyRec = true;
        }
    });
  }

}
