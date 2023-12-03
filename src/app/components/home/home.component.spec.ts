import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
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

  it('should remove the corresponding post when delete button is clicked', () => {
    // Arrange
    const testPosts = [
      { title: 'Test Title 1', content: 'Test Content 1' },
      { title: 'Test Title 2', content: 'Test Content 2' },
      { title: 'Test Title 3', content: 'Test Content 3' },
    ];

    spyOn(postService, 'getPosts').and.returnValue([...testPosts]);

    fixture.detectChanges();

    // Act and Assert
    testPosts.forEach((_, index) => {
      const postCountBeforeDeletion = component.posts.length;
      fixture.nativeElement.querySelectorAll('.delete-button')[index].click();
      fixture.detectChanges(); // Refresh the component after clicking delete button
      expect(component.posts.length).toBe(postCountBeforeDeletion);
    });
  });

  it('should enter edit mode when Edit button is clicked', () => {
    // Arrange
    const testPosts = [
      { title: 'Test Title 1', content: 'Test Content 1' },
      { title: 'Test Title 2', content: 'Test Content 2' },
    ];
    spyOn(postService, 'getPosts').and.returnValue([...testPosts]);

    fixture.detectChanges();

    // Act and Assert
    fixture.nativeElement.querySelector('.edit-button').click();
    expect(component.editMode).toBe(true);
    expect(component.editedPostIndex).toBe(0);
    expect(component.editedPostTitle).toBe(testPosts[0].title);
    expect(component.editedPostContent).toBe(testPosts[0].content);
  });
});
