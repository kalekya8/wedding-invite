import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InviteComponent } from './pages/invite/invite.component';
import { GuestListComponent } from './pages/guest-list/guest-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'list', component: GuestListComponent },
  { path: '**', redirectTo: '' }
];
