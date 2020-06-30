import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'Login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {
    path: '', redirectTo: '/blog', pathMatch: 'full',

  },

  {
    path: '', loadChildren: './posts/posts.module#PostsModule' ,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
