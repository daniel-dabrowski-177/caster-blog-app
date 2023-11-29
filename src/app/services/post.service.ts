import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: any[] = [];
  private postsSubject = new BehaviorSubject<any[]>(this.posts);

  constructor() {}

  getPosts() {
    return this.posts;
  }

  getPostsSubject() {
    return this.postsSubject;
  }

  addPost(post: any): void {
    this.posts.push(post);
    this.postsSubject.next([...this.posts]);
  }
}
