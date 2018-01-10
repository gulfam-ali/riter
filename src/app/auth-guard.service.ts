import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate() {
    console.log('AuthGuard#canActivate called');

    if( !( this.cookieService.check('userId') && this.cookieService.check('token')) ){
        this.router.navigate(['/login']);
    }else
      return true;
  }
}
