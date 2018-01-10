import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticateService {
  const cookieExists: boolean;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  authorise()
  {
    return ( this.cookieService.check('userId') && this.cookieService.check('token') );
  }

}
