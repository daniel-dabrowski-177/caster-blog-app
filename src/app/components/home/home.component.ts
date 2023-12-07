import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  editMode: boolean = false;
  editedPostIndex: number | null = null;
  editedPostTitle: string = '';
  editedPostContent: string = '';
  postTitle: string = '';
  postContent: string = '';

  // posts: { title: string; content: string }[] = [];
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  // ngOnInit() {
  //   this.posts = this.postService.getPosts();
  //   this.loadPosts();
  // }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  deletePost(index: number) {
    this.postService.deletePost(index);
    this.loadPosts(); // Refresh the posts after deletion
  }

  enterEditMode(index: number) {
    const post = this.posts[index];
    this.editMode = true;
    this.editedPostIndex = index;
    this.editedPostTitle = post.title;
    this.editedPostContent = post.content;
  }

  updatePost() {
    if (
      this.editedPostTitle.trim() !== '' &&
      this.editedPostContent.trim() !== ''
    ) {
      // Aktualizacja posta
      const updatedPost = {
        title: this.editedPostTitle,
        content: this.editedPostContent,
      };

      // Sprawdź, czy wartość nie jest równa null
      if (this.editedPostIndex !== null) {
        this.postService.updatePost(this.editedPostIndex, updatedPost);
        this.exitEditMode();
      }
    }
  }

  exitEditMode() {
    this.editMode = false;
    this.editedPostIndex = null;
    this.editedPostTitle = '';
    this.editedPostContent = '';
    this.loadPosts();
  }

  addPost() {
    if (this.postTitle.trim() !== '' && this.postContent.trim() !== '') {
      const newPost = { title: this.postTitle, content: this.postContent };
      this.postService.addPost(newPost);
      this.loadPosts();
      this.postTitle = '';
      this.postContent = '';
    }
  }
}
