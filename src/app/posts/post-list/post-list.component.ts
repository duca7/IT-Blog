import { Observable } from 'rxjs';;
import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


  posts: Observable<Post[]>

  constructor(
    private postService: PostService,
    public auth: AuthService,
  )
    {}

  ngOnInit() {
  this.posts = this.postService.getPosts();
  }

  delete(id: string) {
    this.postService.delete(id)
  }







}

