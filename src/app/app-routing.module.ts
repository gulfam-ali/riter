import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { FeedComponent } from './feed/feed.component';
import { WriteComponent } from './write/write.component';
import { StoryComponent } from './story/story.component';
import { ProfileComponent } from './profile/profile.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';
import { MessagesComponent } from './messages/messages.component';
import { StatsComponent } from './stats/stats.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SettingsComponent } from './settings/settings.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MemberComponent } from './member/member.component';

import { GuestGuard }                from './guest-guard.service';
import { AuthGuard }                from './auth-guard.service';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [GuestGuard]},
  { path: 'home', component: HomeComponent, canActivate: [GuestGuard]},
  { path: 'about', component: AboutComponent, canActivate: [GuestGuard]},
  { path: 'menu', component: MobileMenuComponent, canActivate: [AuthGuard]},
  { path: 'feed', component: FeedComponent,  canActivate: [AuthGuard]},
  { path: 'story',  redirectTo: '/feed', pathMatch: 'full'},
  { path: 'feed/:id', component: StoryComponent, canActivate: [AuthGuard]},
  { path: 'write', component: WriteComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard]},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  { path: 'my-stories', component: MyStoriesComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  { path: 'forget', component: ForgetPasswordComponent, canActivate: [GuestGuard]},
  { path: ':username', component: MemberComponent},
  { path: '**', component: HomeComponent, canActivate: [GuestGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() { }
 }
