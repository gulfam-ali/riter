import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate() {
<<<<<<< HEAD
=======
    console.log('AuthGuard#canActivate called');

>>>>>>> 38e84f6961e80223d2b1fb1bd7aafe50d6a9ff49
    if( !( this.cookieService.check('userId') && this.cookieService.check('token')) ){
        this.router.navigate(['/login']);
    }else
      return true;
  }
}
