import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Member } from '../member.model';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-view-member',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  template: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EDIC Members Frontend</title>
        <style>
          /* Global Styling */
          body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            color: #333;
            margin: 20px;
          }

          .container {
            background-color: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            animation: fadeIn 0.5s ease;
          }

          h2 {
            color: #4a5568;
          }

          /* Search Bar */
          input[type='text'] {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            font-size: 14px;
            width: 100%;
            margin-bottom: 20px;
          }

          /* Buttons */
          button {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 8px 12px;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #45a049;
          }

          button.edit-btn {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 50%;
            color: #555;
            padding: 4px;
            margin-left: 5px;
            cursor: pointer;
          }

          button.edit-btn:hover {
            background-color: #e7e7e7;
          }

          button.btn-outline-danger {
            background-color: #e74c3c;
            color: white;
          }

          /* Table Styling */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th,
          td {
            text-align: center;
            padding: 12px;
            border-bottom: 1px solid #ddd;
          }

          th {
            background-color: #f4f4f4;
            color: #4a5568;
          }

          tr:hover {
            background-color: #f9f9f9;
          }

          /* Profile Images */
          img.rounded-circle {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
          }

          /* Animation */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Members List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Contact Info</th>
                <th>Email</th>
                <th>Date Of Joining</th>
                <th>Committee Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of members">
                <td>{{ m.memberId }}</td>
                <td>
                  <img
                    src="https://i.pravatar.cc/40?u={{ m.memberId }}"
                    class="rounded-circle"
                  />
                  {{ m.name }}
                </td>
                <td>{{ m.role }} <button class="edit-btn">✎</button></td>
                <td>{{ m.contactInfo }}</td>
                <td>{{ m.email }}</td>
                <td>
                  {{ m.dateOfJoining }} <button class="edit-btn">✎</button>
                </td>
                <td>{{ m.committeeType }}</td>
                <td>{{ m.status }}</td>
                <td>
                  <button
                    class="btn-outline-danger"
                    (click)="deleteMember(m.memberId)"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `,
})
export class ViewMemberComponent implements OnInit {
  members: Member[] = [];
  selectedMember: Member | null = null;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.membersService.getAllMembers().subscribe(
      (response: any) => {
        this.members = response.data;
      },
      (error: any) => {
        console.error('Error fetching members:', error);
      }
    );
  }

  deleteMember(memberId: number | undefined): void {
    if (memberId !== undefined) {
      this.membersService.deleteMember(memberId).subscribe(
        () => {
          this.members = this.members.filter((m) => m.memberId !== memberId);
        },
        (error: any) => {
          console.error('Error deleting member:', error);
        }
      );
    }
  }
}
