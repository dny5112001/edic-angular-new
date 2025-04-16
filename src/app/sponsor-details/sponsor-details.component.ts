import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sponsor-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Add HttpClientModule
  templateUrl: './sponsor-details.component.html',
  styleUrls: ['./sponsor-details.component.css'],
})
export class SponsorDetailsComponent implements OnInit {
  sponsorId: string = '';
  sponsorData: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sponsorId = params['id'];
      this.loadSponsorData();
    });
  }

  loadSponsorData(): void {
    this.http
      .get(`http://localhost:3030/api/sponsors/${this.sponsorId}`)
      .subscribe({
        next: (data: any) => {
          this.sponsorData = data;
        },
        error: (err) => {
          console.error('Error fetching sponsor data:', err);
          // Optionally, set fallback or error message
          this.sponsorData = { name: 'Sponsor not found' };
        },
      });
  }
}
