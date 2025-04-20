import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { CashTransactionsComponent } from './features/cash-transactions/cash-transactions.component';
import { CurrentAccountsComponent } from './features/current-accounts/current-accounts.component';
import { HomeComponent } from './features/home/home.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { CashTransactionDetailComponent } from './features/cash-transactions/cash-transaction-detail/cash-transaction-detail.component';
import { provideStates } from '@ngxs/store';
import { ClCardState } from './state/clcard/clcard.state';
import { BnCardState } from './state/bncard/bncard.state';
import { CurrentAccountsDetailComponent } from './features/current-accounts/current-accounts-detail/current-accounts-detail.component';
import { BankComponent } from './features/bank/bank.component';
import { BankDetailComponent } from './features/bank/bank-detail/bank-detail.component';
import { KsCardState } from './state/kscard/kscard.state';
import { PurchaseInvoicesComponent } from './features/purchase-invoices/purchase-invoices.component';
import { InvoiceState } from './state/invoice/invoice.state';
import { InvoiceDetailComponent } from './features/invoice-detail/invoice-detail.component';
import { SalesInvoicesComponent } from './features/sales-invoices/sales-invoices.component';
import { BnCreditCardState } from './state/bncreditcard/bncreditcard.state';
import { CreditCardsComponent } from './features/credit-cards/credit-cards.component';
import { CreditCardDetailComponent } from './features/credit-cards/credit-card-detail/credit-card-detail.component';
import { PromissoryNoteDetailComponent } from './features/promissory-note-detail/promissory-note-detail.component';
import { PimakPromissoryNotesComponent } from './features/pimak-promissory-notes/pimak-promissory-notes.component';
import { CsCardState } from './state/cscard/cscard.state';
import { CustomerPromissoryNotesComponent } from './features/customer-promissory-notes/customer-promissory-notes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'calendar', component: CalendarComponent },
      {
        path: 'cash-transactions',
        component: CashTransactionsComponent,
        providers: [provideStates([KsCardState])]
      },
      {
        path: 'current-accounts',
        component: CurrentAccountsComponent,
        providers: [provideStates([ClCardState])]
      },
      {
        path: 'banks',
        component: BankComponent,
        providers: [provideStates([BnCardState])]
      },
      {
        path: 'credits',
        component: CreditCardsComponent,
        providers: [provideStates([BnCreditCardState])]
      },
      {
        path: 'purchase-invoices',
        component: PurchaseInvoicesComponent,
        providers: [provideStates([InvoiceState])]
      },
      {
        path: 'sales-invoices',
        component: SalesInvoicesComponent,
        providers: [provideStates([InvoiceState])]
      },
      {
        path: 'pimak-promissory-notes',
        component: PimakPromissoryNotesComponent,
        providers: [provideStates([CsCardState])]
      },
      {
        path: 'customer-promissory-notes',
        component: CustomerPromissoryNotesComponent,
        providers: [provideStates([CsCardState])]
      }
    ],
  },
  {
    path: 'cash-transactions/detail/:id',
    component: CashTransactionDetailComponent,
  },
  {
    path: 'current-accounts/detail/:id',
    component: CurrentAccountsDetailComponent,
  },
  {
    path: 'banks/detail/:id',
    component: BankDetailComponent,
  },
  {
    path: 'credits/detail/:id',
    component: CreditCardDetailComponent,
  },
  {
    path: 'purchase-invoices/detail/:id',
    component: InvoiceDetailComponent,
  },
  {
    path: 'sales-invoices/detail/:id',
    component: InvoiceDetailComponent,
  },
  {
    path: 'pimak-promissory-notes/detail/:id',
    component: PromissoryNoteDetailComponent,
  },
  {
    path: 'customer-promissory-notes/detail/:id',
    component: PromissoryNoteDetailComponent,
  },
  { path: '**', component: LoginComponent },
];
