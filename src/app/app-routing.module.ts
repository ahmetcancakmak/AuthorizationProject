import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Role} from "./models/role";
import {AuthGuard} from "./guards/auth.guard";
import {UserListingPageComponent} from "./components/user-listing-page/user-listing-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listing',
    component: UserListingPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin,Role.SuperAdmin] }
  },
  {
    path: 'login',
    component: LoginPageComponent
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
