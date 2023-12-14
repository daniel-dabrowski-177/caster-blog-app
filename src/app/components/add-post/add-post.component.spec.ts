import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post.component';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let postService: PostService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [PostService],
    });

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize postTitle and postContent to empty strings', () => {
    expect(component.postTitle).toBe('');
    expect(component.postContent).toBe('');
  });

  it('should call onSubmit() when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should add a new post and navigate to home on submit', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.postTitle = 'Test Title';
    component.postContent = 'Test Content';
    component.onSubmit();

    expect(postService.getPosts().length).toBe(1);
    expect(navigateSpy).toHaveBeenCalledWith('/');
  });
});
