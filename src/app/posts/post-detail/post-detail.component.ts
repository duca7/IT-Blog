import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post
  editing: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService

  ) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.getPostData(id).subscribe(post => (this.post = post))
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.update(id, formData)
    this.editing = false
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id)
    this.router.navigate(['/blog'])
  }


}
