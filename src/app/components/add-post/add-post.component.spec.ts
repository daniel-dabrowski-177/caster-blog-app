import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostComponent } from './add-post.component';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [FormsModule],
      providers: [PostService],
    });

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
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

  it('should clear postTitle and postContent after onSubmit()', () => {
    component.postTitle = 'Example Title';
    component.postContent = 'Example Content';
    component.onSubmit();
    expect(component.postTitle).toBe('');
    expect(component.postContent).toBe('');
  });
});
