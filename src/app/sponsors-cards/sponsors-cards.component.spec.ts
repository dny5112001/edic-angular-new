import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsCardsComponent } from './sponsors-cards.component';

describe('SponsorsCardsComponent', () => {
  let component: SponsorsCardsComponent;
  let fixture: ComponentFixture<SponsorsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
