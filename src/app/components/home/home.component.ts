import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postTitle: string = '';
  postContent: string = '';
  posts: Post[] = [];
  editFormData = { title: '', content: '' };
  editMode: boolean[] = new Array<boolean>(this.posts.length).fill(false);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  deletePost(postId: string | undefined): void {
    if (!postId) {
      console.error('Invalid post ID');
      return;
    }

    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post._id !== postId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editPost(selectedPost: Post, index: number): void {
    this.editFormData = {
      title: selectedPost.title,
      content: selectedPost.content,
    };
    this.editMode[index] = true;
  }

  saveEdit(post: Post, index: number): void {
    const editedPost = {
      ...post,
      title: this.editFormData.title,
      content: this.editFormData.content,
    };

    this.postService.editPost(editedPost).subscribe(
      () => {
        this.posts[index] = editedPost;
        this.editMode[index] = false;
      },
      (error) => console.error(error)
    );
  }

  cancelEdit(index: number): void {
    this.editMode[index] = false;
  }
}
