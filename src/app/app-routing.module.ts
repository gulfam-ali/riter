import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Routes, RouterModule, CanActivate } from '@angular/router';

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


import { AuthGuard }                from './auth-guard.service';

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  { path: 'write', component: WriteComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent},
  { path: 'bookmarks', component: BookmarksComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'my-stories', component: MyStoriesComponent},
  { path: 'messages', component: MessagesComponent},
  { path: 'stats', component: StatsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forget', component: ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() { }
 }
