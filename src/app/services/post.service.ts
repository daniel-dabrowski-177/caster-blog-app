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
  private apiUrl = 'https://caster-angular-blog-app-full.onrender.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/posts/`);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/posts/`, post);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/posts/${postId}`);
  }

  editPost(post: Post): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/posts/${post._id}`, post);
  }
}
