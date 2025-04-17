import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {

  onCtaClick() {
    console.log('CTA button clicked!');
    // Add navigation or action logic here, e.g., router.navigate(['/signup'])
  }

  companyName = 'JOIN US IN SHAPING THE FUTURE OF INNOVATION';
  heroTitle = 'Empower Innovation, Fuel Entrepreneurship';
  heroSubtitle = 'Join us in supporting young innovators, startups, and groundbreaking ideas that shape the future.';


}
