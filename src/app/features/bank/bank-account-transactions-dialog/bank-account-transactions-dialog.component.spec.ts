import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountTransactionsDialogComponent } from './bank-account-transactions-dialog.component';

describe('BankAccountTransactionsDialogComponent', () => {
  let component: BankAccountTransactionsDialogComponent;
  let fixture: ComponentFixture<BankAccountTransactionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountTransactionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountTransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
