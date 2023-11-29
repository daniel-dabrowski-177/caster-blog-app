import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PostService } from '../../services/post.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [PostService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts from the post service', () => {
    const testPosts = [
      { title: 'Test Title 1', content: 'Test Content 1' },
      { title: 'Test Title 2', content: 'Test Content 2' },
    ];

    spyOn(postService, 'getPosts').and.returnValue(testPosts);

    fixture.detectChanges();

    const postElements = fixture.nativeElement.querySelectorAll('.post');

    expect(postElements.length).toBe(testPosts.length);

    testPosts.forEach((post, index) => {
      const titleElement = postElements[index].querySelector('.post-title');
      const contentElement = postElements[index].querySelector('.post-content');

      expect(titleElement.textContent).toContain(post.title);
      expect(contentElement.textContent).toContain(post.content);
    });
  });
});
