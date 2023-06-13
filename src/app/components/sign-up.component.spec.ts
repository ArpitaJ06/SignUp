import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';
import { SignUpComponent } from './sign-up.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: SignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [SignUpService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    signUpService = TestBed.inject(SignUpService);
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.signUpForm.value).toEqual({
      firstName: '',
      lastName: '',
      password: '',
      email: ''
    });
  });

  it('should set form control validity', () => {
    const firstNameControl = component.signUpForm.get('firstName');
    const lastNameControl = component.signUpForm.get('lastName');
    const emailControl = component.signUpForm.get('email');

    firstNameControl?.setValue('Arpita');
    lastNameControl?.setValue('Jain');
    emailControl?.setValue('arpita.jain5137@gmail.com');

    expect(firstNameControl?.valid).toBe(true);
    expect(lastNameControl?.valid).toBe(true);
    expect(emailControl?.valid).toBe(true);
  });
});
