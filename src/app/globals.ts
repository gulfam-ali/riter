import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Injectable()
export class Globals {
    apiUrl: string = "https://wordsire.com/wordsire/api/";
    sidebar = { feed: '', bookmarks: '', profile:'', notifications: '', myStories:'', settings:'', menu: ''};
    loadMessage: string = '';

    constructor(private titleService: Title) { }

    setTitle(title: string) {
        this.titleService.setTitle( title );
    }

    setActiveMenu(menu: string){
        this.sidebar = { feed: '', bookmarks: '', profile:'', notifications: '', myStories:'', settings:'', menu: ''};

          switch(menu) {
             case 'feed': {
                this.sidebar.feed = 'active';
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

    showLoad(message: string) {
        this.loadMessage = message;
    }

    hideLoad() {
      this.loadMessage = '';
    }
}
