import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify observers when posts are updated', () => {
    const observerSpy = jasmine.createSpy('observerSpy');
    service.getPostsSubject().subscribe(observerSpy);

    const testPost = { title: 'Test Title', content: 'Test Content' };
    service.addPost(testPost);

    // Oczekujemy, że observerSpy zostanie wywołany po dodaniu posta
    expect(observerSpy).toHaveBeenCalled();
  });
});
