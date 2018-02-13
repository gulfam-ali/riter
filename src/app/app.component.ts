import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
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
    constructor(private api: ApiService, private http: HttpClientModule, private router: Router, private cookieService: CookieService, private globals: Globals)
    {
        this.globals.setTitle( 'Wordsire' );
        this.api.getNotifsCount();

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

    ngOnInit() {
    }

    logout(){
      this.cookieService.deleteAll();
      this.router.navigate(['/']);
    }


}
