import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashTransactionsComponent } from './cash-transactions.component';

describe('CashTransactionsComponent', () => {
  let component: CashTransactionsComponent;
  let fixture: ComponentFixture<CashTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
