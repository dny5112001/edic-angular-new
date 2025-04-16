import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';

interface Sponsor {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  websiteUrl?: string;
  level?: string;
  featured?: boolean;
  contributionAmount?: number;
  contactEmail?: string;
  contactName?: string;
  contactPhone?: string;
  sponsoredEvent?: string;
}

@Component({
  selector: 'app-sponsors-cards',
  standalone: true,
  imports: [RouterModule], // No CommonModule needed with @if
  templateUrl: './sponsors-cards.component.html',
  styleUrls: ['./sponsors-cards.component.scss'],
})
export class SponsorsCardsComponent implements OnInit {
  sponsors: Sponsor[] = [];
  loading = true;
  error: string | null = null;

  private apiUrl = 'http://localhost:3030/api/sponsors/featured';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSponsors();
  }

  private fetchSponsors(): void {
    this.http
      .get<Sponsor[]>(this.apiUrl)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.error = 'Failed to load sponsors. Please try again later.';
          this.loading = false;
          return throwError(() => new Error(err.message));
        })
      )
      .subscribe({
        next: (data) => {
          this.sponsors = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}
