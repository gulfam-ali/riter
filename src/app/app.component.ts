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
    username: string = '';
    sidebarVisible = false;
    is_logged: boolean;
    constructor(private http: HttpClientModule, private cookieService: CookieService, private globals: Globals)
    {
        this.globals.setTitle( 'Wordsire' );

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
      if (event.isReachingTop) {
        this.position = "relative";
      }
    }

    logout(){
      this.cookieService.deleteAll();
      window.location.href = "";
    }


}
