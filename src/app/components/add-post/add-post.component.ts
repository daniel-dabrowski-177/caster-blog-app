import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  newPost: Post = { title: '', content: '' };

  constructor(private postService: PostService, private router: Router) {}

  addPost(): void {
    if (!this.newPost.title || !this.newPost.content) {
      return;
    }

    this.postService.addPost(this.newPost).subscribe(
      () => this.router.navigate(['/']),
      (error) => console.error(error)
    );
  }
}
