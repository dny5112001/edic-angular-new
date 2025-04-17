import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  joinNow() {
    console.log('Redirecting to Join Us page...');
    window.location.href = '/join'; // Update with actual navigation (e.g., Angular Router)
  }
}