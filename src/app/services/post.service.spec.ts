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

  it('addPost() should add a new post and notify observers', () => {
    const observerSpy = jasmine.createSpy('observerSpy');
    service.getPosts().subscribe(observerSpy);

    const testPost = { title: 'Test Title', content: 'Test Content' };
    service.addPost(testPost);

    expect(service['posts']).toEqual([testPost]);
    expect(observerSpy).toHaveBeenCalled();
  });
});
