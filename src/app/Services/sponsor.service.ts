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
  providedIn: 'root'
})
export class SponsorService {
  private apiUrl = 'http://localhost:8080/api/sponsors/top';

  constructor(private http: HttpClient) {}

  getTopSponsors(): Observable<SponsorCardDto[]> {
    return this.http.get<SponsorCardDto[]>(this.apiUrl);
  }
}
