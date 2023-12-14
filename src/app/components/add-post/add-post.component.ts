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
  postTitle: string = '';
  postContent: string = '';
  newPost: Post = { title: '', content: '' };

  constructor(private postService: PostService, private router: Router) {}

  createPost() {
    this.postService.createPost(this.newPost).subscribe((createdPost) => {
      console.log('Post created:', createdPost);
    });
  }

  onSubmit() {
    this.postService.createPost(this.newPost).subscribe((createdPost) => {
      console.log('Post created:', createdPost);

      this.postService.addPost(createdPost);

      this.newPost = { title: '', content: '' };
      this.router.navigateByUrl('/');
    });
  }
}
