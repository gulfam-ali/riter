import { Injectable } from '@angular/core';
import { Title, DomSanitizer }     from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class Globals {
    /*apiUrl: string = "https://wordsire.com/api/";
    mediaUrl: string = "https://wordsire.com/media";
    webUrl: string = "https://wordsire.com";
*/

    apiUrl: string = "http://localhost/riter/api/";
    mediaUrl: string = "http://localhost/riter/media";
    webUrl: string = "http://localhost/riter-web";

    userAvtar: string = 'default.png';
    username: string = '';
    sidebar = { login:'', register:'', feed: '', write: '', bookmarks: '', profile:'', notifications: '', myStories:'', settings:'', menu: ''};
    loadMessage: string = '';

    loading: boolean = true;
    error: boolean = false;
    errorMessage: string = 'Oops! Something went wrong';
    errorDescription: string = '';

    errorCodes = {
      error_404 : 'Error 404',
      error_404_des: "The page you are looking for no longer exist or moved somewhere else.",

      profile: 'Profile not found',
      profile_des: "The profile you are looking for doesn't exist",

      oops: 'Oops! Something went wrong.',
      oops_des: "We’re sorry, but something went wrong. We've been notified about this issue and we’ll take a look at it shortly.",

      network: "No Internet Connection",
      network_des: "It looks like you have no internet connection. Please check your network connection and try again.",

      zero_feed: 'No new stories',
      zero_feed_des: "Currently there are no new stories posted. Please visit us again later. ",

      zero_bookmark: "You have no bookmark stories yet",
      zero_bookmark_des: "Save your favourite stories using bookmarks.",

      zero_write: "You haven't written any story yet",
      zero_write_des: "Start writing and increase your fan following.",

      zero_notifs: "No new notifications",
      zero_notifs_des: "Any event related to you or your stories is notified here."
    }
    newNotifs = 0;

    constructor(private sanitizer:DomSanitizer, private titleService: Title, private cookieService: CookieService) {
        this.username = this.cookieService.get('username');
    }

    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    setTitle(title: string) {
        this.titleService.setTitle( title );
    }

    setActiveMenu(menu: string){
        this.sidebar = { login:'', register:'', feed: '', write:'', bookmarks: '', profile:'', notifications: '', myStories:'', settings:'', menu: ''};

          switch(menu) {
            case 'login': {
               this.sidebar.login = 'active';
               break;
            }
            case 'register': {
               this.sidebar.register = 'active';
               break;
            }
            case 'feed': {
                this.sidebar.feed = 'active';
                break;
             }
             case 'write': {
                 this.sidebar.write = 'active';
                 break;
              }
             case 'bookmarks': {
                this.sidebar.bookmarks = 'active';
                break;
             }
             case 'profile': {
                this.sidebar.profile = 'active';
                break;
             }
             case 'notifications': {
                this.sidebar.notifications = 'active';
                break;
             }
             case 'myStories': {
                this.sidebar.myStories = 'active';
                break;
             }
             case 'settings': {
                this.sidebar.settings = 'active';
                break;
             }
             case 'menu': {
                this.sidebar.menu = 'active';
                break;
             }
             default: {
                break;
             }
          }
    }

    clearErrorMsg(){
        this.loading = true;
        this.error  = false;
        this.errorMessage = '';
        this.errorDescription = '';
    }

    showLoad(message: string) {
        this.loadMessage = message;
    }

    hideLoad() {
      this.loadMessage = '';
    }

    openStory(story_id: number){
        window.location.href = "./feed/"+story_id;
    }


    handleApiError(error: any){
      this.loading = false;
      this.error = true;

      if(error.status == 0)
      {
        this.errorMessage = this.errorCodes.network;
        this.errorDescription = this.errorCodes.network_des;
      }else{
        this.errorMessage = this.errorCodes.oops;
        this.errorDescription = this.errorCodes.oops_des;
      }
    }
}
