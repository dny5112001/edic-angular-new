// contact-us.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true,
  providers: [FormBuilder],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  success = false;
  error = false;

  sponsorshipTypes = [
    { value: 'platinum', label: 'Platinum Sponsor' },
    { value: 'gold', label: 'Gold Sponsor' },
    { value: 'silver', label: 'Silver Sponsor' },
    { value: 'bronze', label: 'Bronze Sponsor' },
    { value: 'event', label: 'Event Sponsor' },
    { value: 'media', label: 'Media Partner' },
    { value: 'inkind', label: 'In-Kind Sponsor' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: [''],
      sponsorshipType: ['', Validators.required],
      message: ['', Validators.required],
      botcheck: [false]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid && !this.contactForm.value.botcheck) {
      const formData = new FormData();

      // Add your access key
      formData.append('access_key', 'b9e4c4f1-8315-4753-942b-10bd9aee81db');

      // Append form data
      formData.append('company_name', this.contactForm.value.companyName);
      formData.append('email', this.contactForm.value.email);
      formData.append('mobile_number', this.contactForm.value.mobileNumber);
      formData.append('sponsorship_type', this.contactForm.value.sponsorshipType);
      formData.append('message', this.contactForm.value.message);

      // Submit the form
      this.http.post('https://api.web3forms.com/submit', formData)
        .subscribe({
          next: (response: any) => {
            if (response.success) {
              this.success = true;
              this.contactForm.reset();
              this.submitted = false;
            }
          },
          error: (error) => {
            this.error = true;
            console.error('Form submission error:', error);
          }
        });
    }
  }
}
