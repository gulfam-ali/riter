import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'riter';
  username: string = '';
  sidebarVisible = false;
  sidebar = { feed: '', bookmarks: '', profile:'', notifications: '', myStories:'', settings:''};
  is_logged: boolean;
  constructor(private http: HttpClientModule, private cookieService: CookieService)
  {

      if( !( this.cookieService.check('userId') && this.cookieService.check('token')) ){
          this.is_logged = false;
      }else{
          this.is_logged = true;
          this.sidebarVisible = true;
      }

      this.username = this.cookieService.get('firstName')+' '+this.cookieService.get('lastName');
  }

  logout(){
    this.cookieService.deleteAll();

    //this.cookieService.delete('userId');
    //this.cookieService.delete('token');

    window.location.href = "";
  }


}
