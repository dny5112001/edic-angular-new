import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SponsorCardDto {
  name: string;
  description: string;
  logoUrl: string;
  shortName: string;
}

@Injectable({
<<<<<<< HEAD
  providedIn: 'root'
})
export class SponsorService {
  private apiUrl = 'http://localhost:8080/api/sponsors/top';
=======
  providedIn: 'root',
})
export class SponsorService {
  private apiUrl = 'http://localhost:3030/api/sponsors/top';
>>>>>>> 63f21278f22f14bf3e611b070ab866b55aebc66b

  constructor(private http: HttpClient) {}

  getTopSponsors(): Observable<SponsorCardDto[]> {
    return this.http.get<SponsorCardDto[]>(this.apiUrl);
  }
}
