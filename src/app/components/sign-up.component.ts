import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signUpForm: FormGroup; //Reactive form group

  constructor(private readonly fb: FormBuilder, private signUpService: SignUpService) {
    this.signUpForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]), // First name field with required validation
      lastName: this.fb.control('', [Validators.required]), // Last name field with required validation 
      email: this.fb.control('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]), // Email field with required and email validations
      password: this.fb.control('', [Validators.required, Validators.minLength(8), this.passwordValidator()]) // Password field with required, minimum length and 1 custom validation
    });
  }

  ngOnInit() {
  }

  get signUpFormControls(): any {
    return this.signUpForm.controls;
  }

  checkIsPasswordValid() {
    const password = this.signUpForm.get('password') as FormControl;
    password.updateValueAndValidity(); // Rerun the validation check. In case, the user enters the 'Password' first followed by 'First Name'
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      const formGroup = control.parent;
      if (!formGroup) {
        return null;
      }
      const firstName = formGroup.get('firstName')?.value as string;
      const lastName = formGroup.get('lastName')?.value as string;

      // Password validation check if it contains atleast 1 UPPERCASE and 1 lowercase character
      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
        return { pattern: true };
      }

      // Password validation check if it contains user's First and Last name
      if (firstName && value.toLowerCase().includes(firstName.toLowerCase()) || lastName && value.toLowerCase().includes(lastName.toLowerCase())) {
        return { forbiddenValue: true };
      }

      return null;
    };
  }

  onSubmit() {
    const postFormData = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email
    };

    // Peform te API request
    this.signUpService.postDetails(postFormData).subscribe({
      next: response => {
        // Handle successful signup
        console.log('Signup successful:', response);
        alert("Congratulations. Signup Successful")
      },
      error: error => {
        // Handle signup error
        console.error('Signup error:', error);
      }
    }
    );

    //Clear all input fields on click of 'Submit' button
    this.signUpForm.reset();
  }
}
