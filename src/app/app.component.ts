import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { SponsorsCardsComponent } from './sponsors-cards/sponsors-cards.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AboutUsComponent } from "./about-us/about-us.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    HeroSectionComponent,
    SponsorsCardsComponent,
    FooterComponent,
    ContactUsComponent,
    HttpClientModule,
    ReactiveFormsModule,
    AboutUsComponent
]
})
export class AppComponent implements OnInit {
  title: string = 'Welcome to Edic!';
  isHomePage: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if current route is home page
      this.isHomePage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
    });
  }
}
