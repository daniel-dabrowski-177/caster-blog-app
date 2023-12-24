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
  // private apiUrl = 'caster-angular-blog-app.netlify.app';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts/`);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post(`/api/posts/`, post);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`/api/posts/${postId}`);
  }

  editPost(post: Post): Observable<any> {
    return this.http.put(`/api/posts/${post._id}`, post);
  }
}
