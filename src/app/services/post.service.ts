// post.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: any[] = [];
  private postsSubject = new BehaviorSubject<any[]>(this.posts);

  getPosts() {
    return this.postsSubject.asObservable();
  }

  addPost(post: any) {
    this.posts.push(post);
    this.postsSubject.next(this.posts);
  }
}
