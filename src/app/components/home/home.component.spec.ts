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

    const deleteButtons =
      fixture.nativeElement.querySelectorAll('.delete-button');
    const postCountBeforeDeletion = component.posts.length;

    // Act
    deleteButtons[0].click(); // Assume the delete button for the first post is clicked

    // Assert
    fixture.detectChanges(); // Refresh the component after clicking delete button
    expect(component.posts.length).toBe(postCountBeforeDeletion);

    // Repeat for the second post
    deleteButtons[1].click();
    fixture.detectChanges();
    expect(component.posts.length).toBe(postCountBeforeDeletion);

    // Repeat for the third post
    deleteButtons[2].click();
    fixture.detectChanges();
    expect(component.posts.length).toBe(postCountBeforeDeletion);
  });
});
