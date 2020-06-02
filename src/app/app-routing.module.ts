import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'Login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'Home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo: '/blog', pathMatch: 'full'},
  { path: '', loadChildren: './posts/posts.module#PostsModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
