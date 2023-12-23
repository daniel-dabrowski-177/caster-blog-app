import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AddPostComponent } from './add-post.component';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let postService: PostService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    router = TestBed.inject(Router);
  }));

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });
});
