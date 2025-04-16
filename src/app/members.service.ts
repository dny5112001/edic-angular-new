import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private baseUrl = 'http://localhost:3030/EDIC/members';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  saveMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, member);
  }

  deleteMember(memberId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${memberId}`);
  }
}
