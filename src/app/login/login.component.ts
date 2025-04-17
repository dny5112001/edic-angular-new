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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  token: string | null = null; // Variable to store the token

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      collegeEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-1][0-9]{9}@tcetmumbai.in$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Check if already logged in
    this.token = localStorage.getItem('authToken');
    if (this.token) {
      this.router.navigate(['/']); // Redirect to dashboard if logged in
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    // Mark all fields as touched to trigger validation messages
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.loginForm.valid) {
      this.isLoading = true;

      const loginData = {
        email: this.loginForm.get('collegeEmail')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.http.post('http://localhost:8080/auth/login', loginData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.token) {
            // Store token in localStorage and class variable
            this.token = response.token;
            localStorage.setItem('authToken', this.token as string); // Type assertion

            this.successMessage = 'Login successful! Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/']); // Redirect to dashboard
            }, 2000); // Redirect after 2 seconds
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        },
      });
    }
  }
}