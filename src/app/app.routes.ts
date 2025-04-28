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
import { ReceivedOrficheComponent } from './features/received-orfiche/received-orfiche.component';
import { OrficheState } from './state/orfiche/orfiche.state';
import { OrficheDetailComponent } from './features/orfiche-detail/orfiche-detail.component';
import { PlacedOrficheComponent } from './features/placed-orfiche/placed-orfiche.component';
import { CanActivateTeam } from './services/canactivate';
import { EmptyPageComponent } from './features/empty-page/empty-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: 'home', component: HomeComponent, canActivate: [CanActivateTeam]
      },
      { path: 'calendar', component: CalendarComponent, canActivate: [CanActivateTeam] },
      {
        path: 'cash-transactions',
        component: CashTransactionsComponent,
        providers: [provideStates([KsCardState])],
        canActivate: [CanActivateTeam]
      },
      {
        path: 'current-accounts',
        component: CurrentAccountsComponent,
        providers: [provideStates([ClCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'banks',
        component: BankComponent,
        providers: [provideStates([BnCardState, BnCreditCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'credits',
        component: CreditCardsComponent,
        providers: [provideStates([BnCreditCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'purchase-invoices',
        component: PurchaseInvoicesComponent,
        providers: [provideStates([InvoiceState, ClCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'sales-invoices',
        component: SalesInvoicesComponent,
        providers: [provideStates([InvoiceState, ClCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'pimak-promissory-notes',
        component: PimakPromissoryNotesComponent,
        providers: [provideStates([CsCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'customer-promissory-notes',
        component: CustomerPromissoryNotesComponent,
        providers: [provideStates([CsCardState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'received-orfiches',
        component: ReceivedOrficheComponent,
        providers: [provideStates([OrficheState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'placed-orfiches',
        component: PlacedOrficheComponent,
        providers: [provideStates([OrficheState])], canActivate: [CanActivateTeam]
      },
      {
        path: 'promissory-notes',
        component: EmptyPageComponent, canActivate: [CanActivateTeam]
      },
      {
        path: 'banks-credits',
        component: EmptyPageComponent, canActivate: [CanActivateTeam]
      },
      {
        path: 'invoices',
        component: EmptyPageComponent, canActivate: [CanActivateTeam]
      },
      {
        path: 'orfiches',
        component: EmptyPageComponent, canActivate: [CanActivateTeam]
      },
    ],
  },
  {
    path: 'cash-transactions/detail/:id',
    component: CashTransactionDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'current-accounts/detail/:id',
    component: CurrentAccountsDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'banks/detail/:id',
    component: BankDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'credits/detail/:id',
    component: CreditCardDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'purchase-invoices/detail/:id',
    component: InvoiceDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'sales-invoices/detail/:id',
    component: InvoiceDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'pimak-promissory-notes/detail/:id',
    component: PromissoryNoteDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'customer-promissory-notes/detail/:id',
    component: PromissoryNoteDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'received-orfiches/detail/:id',
    component: OrficheDetailComponent, canActivate: [CanActivateTeam]
  },
  {
    path: 'placed-orfiches/detail/:id',
    component: OrficheDetailComponent, canActivate: [CanActivateTeam]
  },
  { path: '**', component: LoginComponent },
];
