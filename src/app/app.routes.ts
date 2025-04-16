// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SponsorsCardsComponent } from './sponsors-cards/sponsors-cards.component';
import { SponsorDetailsComponent } from './sponsor-details/sponsor-details.component';
import { AllSponsorsComponent } from './all-sponsors/all-sponsors.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViewMemberComponent } from './view-member/view-member.component';

export const routes: Routes = [
  { path: '', component: SponsorsCardsComponent },
  { path: 'sponsor-details/:id', component: SponsorDetailsComponent },
  { path: 'all-sponsors', component: AllSponsorsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-members', component: ViewMemberComponent },
];
