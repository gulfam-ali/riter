import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FeedComponent } from './feed/feed.component';
import { WriteComponent } from './write/write.component';
import { ProfileComponent } from './profile/profile.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { MessagesComponent } from './messages/messages.component';
import { StatsComponent } from './stats/stats.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { HttpClientModule } from '@angular/common/http';

import { Limit } from './limit.pipe';
import { CookieService } from 'ngx-cookie-service';
import { GuestGuard }  from './guest-guard.service';
import { AuthGuard }  from './auth-guard.service';
import { Globals } from './globals';
import { StoryComponent } from './story/story.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FeedComponent,
    WriteComponent,
    ProfileComponent,
    BookmarksComponent,
    NotificationsComponent,
    MyStoriesComponent,
    MessagesComponent,
    StatsComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    Limit,
    StoryComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService, GuestGuard, AuthGuard, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
