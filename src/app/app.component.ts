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
<<<<<<< HEAD
  username: string = '';
=======
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49
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
<<<<<<< HEAD

      this.username = this.cookieService.get('firstName')+' '+this.cookieService.get('lastName');
=======
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49
  }

  logout(){
    this.cookieService.deleteAll();

    //this.cookieService.delete('userId');
<<<<<<< HEAD
    //this.cookieService.delete('token');
=======
    //cookieService.delete('token');
>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49

    window.location.href = "";
  }


}
