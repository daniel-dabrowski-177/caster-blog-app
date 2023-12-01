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
    return this.postsSubject.asObservable();
  }

  addPost(post: any): void {
    this.posts.push(post);
    this.postsSubject.next([...this.posts]);
  }

  deletePost(index: number): void {
    if (index >= 0 && index < this.posts.length) {
      this.posts.splice(index, 1);
      this.postsSubject.next([...this.posts]); // Notify observers about the change
    }
  }
}
