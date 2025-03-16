import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionDetailListComponent } from './cash-transaction-detail-list.component';

describe('CashTransactionDetailListComponent', () => {
  let component: CashTransactionDetailListComponent;
  let fixture: ComponentFixture<CashTransactionDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashTransactionDetailListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashTransactionDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
