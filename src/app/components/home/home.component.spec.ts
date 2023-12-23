import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [PostService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts from the post service', () => {
    const testPosts = [
      { title: 'Test Title 1', content: 'Test Content 1' },
      { title: 'Test Title 2', content: 'Test Content 2' },
    ];

    spyOn(postService, 'getPosts').and.returnValue(of(testPosts)); // Użyj operatora `of` tutaj

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

  it('should set edit mode to true when edit button is clicked', () => {
    // Arrange
    const testPosts = [
      { title: 'Test Title 1', content: 'Test Content 1' },
      { title: 'Test Title 2', content: 'Test Content 2' },
    ];

    spyOn(postService, 'getPosts').and.returnValue(of(testPosts));

    fixture.detectChanges();

    // Act
    fixture.nativeElement.querySelector('.edit-button').click();
    fixture.detectChanges();

    // Assert
    expect(component.editMode.some((mode) => mode === true)).toBeTrue();
  });

  it('should update editFormData when edit button is clicked', () => {
    // Arrange
    const testPosts = [
      { title: 'Test Title 1', content: 'Test Content 1' },
      { title: 'Test Title 2', content: 'Test Content 2' },
    ];

    spyOn(postService, 'getPosts').and.returnValue(of(testPosts));

    fixture.detectChanges();

    // Act
    const index = 0; // choose an index
    fixture.nativeElement.querySelectorAll('.edit-button')[index].click();
    fixture.detectChanges();

    // Assert
    expect(component.editFormData.title).toBe(testPosts[index].title);
    expect(component.editFormData.content).toBe(testPosts[index].content);
  });

  it('should remove the post when delete button is clicked', () => {
    // Arrange
    const testPosts = [
      { _id: '1', title: 'Test Title 1', content: 'Test Content 1' },
      { _id: '2', title: 'Test Title 2', content: 'Test Content 2' },
    ];

    spyOn(postService, 'getPosts').and.returnValue(of(testPosts));
    spyOn(postService, 'deletePost').and.returnValue(of(null)); // Mock the deletePost function
    fixture.detectChanges();

    // Act
    const index = 0; // choose an index
    const deleteButton =
      fixture.nativeElement.querySelectorAll('.delete-button')[index];
    deleteButton.click();
    fixture.detectChanges();

    // Assert
    expect(postService.deletePost).toHaveBeenCalledWith('1'); // Adjust the ID based on your actual implementation
    expect(component.posts.length).toBe(testPosts.length - 1);
  });
});
