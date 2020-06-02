import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes =[
  {path: 'blog', component:PostListComponent},
  {path: 'blog/:id', component:PostDetailComponent},
  {path: 'dashboard',component:PostDashboardComponent},
]

@NgModule({
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
