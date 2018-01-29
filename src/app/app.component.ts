import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  position = "relative";
  title = 'riter';
  username: string = '';
  sidebarVisible = false;
  sidebar = { feed: '', bookmarks: '', profile:'', notifications: '', myStories:'', settings:''};
  is_logged: boolean;
  constructor(private http: HttpClientModule, private cookieService: CookieService, private globals: Globals)
  {

      if( !( this.cookieService.check('userId') && this.cookieService.check('token')) ){
          this.is_logged = false;
      }else{
          this.is_logged = true;
          this.sidebarVisible = true;
      }

      this.username = this.cookieService.get('firstName')+' '+this.cookieService.get('lastName');
  }

  public handleScroll(event) {

    this.position = "fixed";
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isReachingTop) {
      this.position = "relative";
    }

  }

  logout(){
    this.cookieService.deleteAll();

    //this.cookieService.delete('userId');
    //this.cookieService.delete('token');

    window.location.href = "";
  }


}
