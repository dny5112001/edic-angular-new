import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  headerTitle = 'Your App Name'; // Replace with your desired title
  isMenuOpen = false;
  isLoggedIn = false;
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    // Initial check for logged-in state
    this.checkLoginStatus();

    // Subscribe to router events to update login status after navigation
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.toggle('active');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  }

  logout() {
    localStorage.removeItem('authToken'); // Clear the token
    this.isLoggedIn = false; // Update logged-in state
    this.closeMenu(); // Close the menu if open
    this.router.navigate(['/']); // Redirect to home page
  }
}