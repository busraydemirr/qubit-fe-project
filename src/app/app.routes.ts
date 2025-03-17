import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { CashTransactionsComponent } from './features/cash-transactions/cash-transactions.component';
import { CurrentAccountsComponent } from './features/current-accounts/current-accounts.component';
import { HomeComponent } from './features/home/home.component';
import { CashTransactionDetailComponent } from './features/cash-transactions/cash-transaction-detail/cash-transaction-detail.component';
import { provideStates } from '@ngxs/store';
import { ClCardState } from './state/clcard/clcard.state';
import { BnCardState } from './state/bncard/bncard.state';
import { CurrentAccountsDetailComponent } from './features/current-accounts/current-accounts-detail/current-accounts-detail.component';
import { BankComponent } from './features/bank/bank.component';
import { BankDetailComponent } from './features/bank/bank-detail/bank-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  {
    path: '',
    component: HomepageComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'cash-transactions',
        component: CashTransactionsComponent,
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
  { path: '**', component: LoginComponent },
];
