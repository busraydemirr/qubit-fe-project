import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionDetailComponent } from './cash-transaction-detail.component';

describe('CashTransactionDetailComponent', () => {
  let component: CashTransactionDetailComponent;
  let fixture: ComponentFixture<CashTransactionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashTransactionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
