import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  postTitle: string = '';
  postContent: string = '';

  constructor(private postService: PostService, private router: Router) {}

  onSubmit() {
    this.postService.addPost({
      title: this.postTitle,
      content: this.postContent,
    });

    this.postTitle = '';
    this.postContent = '';

    this.router.navigateByUrl('/');
  }
}
