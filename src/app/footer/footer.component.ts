import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';

  subscribe() {
    if (this.email) {
      console.log('Subscribed with email:', this.email);
      // Add your subscription logic here (e.g., API call)
      this.email = '';
    } else {
      console.log('Please enter a valid email');
    }
  }
}