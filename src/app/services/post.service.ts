import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: any[] = [];
  private postsSubject = new BehaviorSubject<any[]>(this.posts);
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
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
      this.postsSubject.next([...this.posts]);
    }
  }

  updatePost(index: number, updatedPost: any): void {
    if (index >= 0 && index < this.posts.length) {
      this.posts[index] = updatedPost;
      this.postsSubject.next([...this.posts]);
    }
  }
}
