import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService, HttpClient],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    const service: PostService = TestBed.inject(PostService);
    expect(service).toBeTruthy();
  });

  // it('should notify observers when posts are updated', () => {
  //   const observerSpy = jasmine.createSpy('observerSpy');
  //   service.getPostsSubject().subscribe(observerSpy);

  //   const testPost = { title: 'Test Title', content: 'Test Content' };
  //   service.addPost(testPost);

  //   // Oczekujemy, że observerSpy zostanie wywołany po dodaniu posta
  //   expect(observerSpy).toHaveBeenCalled();
  // });
});
