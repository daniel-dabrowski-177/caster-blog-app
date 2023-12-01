import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: { title: string; content: string }[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.loadPosts();
  }

  loadPosts() {
    this.posts = this.postService.getPosts();
  }

  deletePost(index: number) {
    this.postService.deletePost(index);
    this.loadPosts(); // Refresh the posts after deletion
  }
}
