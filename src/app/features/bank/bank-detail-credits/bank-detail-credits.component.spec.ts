import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailCreditsComponent } from './bank-detail-credits.component';

describe('BankDetailCreditsComponent', () => {
  let component: BankDetailCreditsComponent;
  let fixture: ComponentFixture<BankDetailCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankDetailCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDetailCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
