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
  is_logged: boolean;
  constructor(private http: HttpClientModule, private cookieService: CookieService)
  {

      if( !( this.cookieService.check('userId') && this.cookieService.check('token')) ){
          this.is_logged = false;
      }else{
          this.is_logged = true;
      }
  }

  logout(){
    this.cookieService.deleteAll();

    //this.cookieService.delete('userId');
    //cookieService.delete('token');

    window.location.href = "";
  }


}
