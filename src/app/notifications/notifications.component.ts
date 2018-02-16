import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';
import { LoaderComponent } from '../loader/loader.component';

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

  constructor(private api: ApiService, private globals: Globals) {
      this.globals.setTitle( "Notifications" );
      this.globals.setActiveMenu( "notifications" );
      this.globals.clearErrorMsg();
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(){
      this.api.getNotifications().subscribe(res => {
        this.globals.loading = false;
          if(res['validate']=='true')
          {
              this.notifications = res['data'];
              this.globals.newNotifs = res['unseen_count'];
          }
          else if(res['validate']=="empty")
          {
              this.globals.error = true;
              this.globals.errorMessage = this.globals.errorCodes.zero_notifs;
              this.globals.errorDescription = this.globals.errorCodes.zero_notifs_des;
          }else{
            this.handleApiError(res);
          }
      },
      error =>{
       this.handleApiError(error);
     });
 }

 handleApiError(error: any){
   this.globals.loading = false;
   this.globals.error = true;

   if(error.status == 0)
   {
     this.globals.errorMessage = this.globals.errorCodes.network;
     this.globals.errorDescription = this.globals.errorCodes.network_des;
   }else{
     this.globals.errorMessage = this.globals.errorCodes.oops;
     this.globals.errorDescription = this.globals.errorCodes.oops_des;
   }
 }

  notif_read(){
    this.api.notifRead().subscribe(res => {
        if(res['validate']=='true')
        {
            this.notifications = res['data'];
            this.globals.newNotifs = res['unseen_count'];
        }else{
          this.globals.error = true;
          this.globals.errorMessage = this.globals.errorCodes.zero_notifs;
          this.globals.errorDescription = this.globals.errorCodes.zero_notifs_des;
        }
    });
  }

}
