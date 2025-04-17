import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        studentUID: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{2}-[A-Z]{3}[0-9]{2}-[0-9]{2}$'),
          ],
        ],
        collegeEmail: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-1][0-9]{9}@tcetmumbai.in$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    // Check if already logged in
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
    }
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    // Mark all fields as touched to trigger validation messages
    Object.keys(this.signupForm.controls).forEach((field) => {
      const control = this.signupForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.signupForm.valid) {
      this.isLoading = true;

      const formData = {
        uid: this.signupForm.get('studentUID')?.value,
        name: `${this.signupForm.get('firstName')?.value} ${
          this.signupForm.get('lastName')?.value
        }`,
        email: this.signupForm.get('collegeEmail')?.value,
        password: this.signupForm.get('password')?.value,
      };

      this.http.post('http://localhost:8080/auth/register', formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.message === 'User registered successfully') {
            this.successMessage = 'Registration successful! Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000); // Redirect after 2 seconds
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        },
      });
    }
  }
}