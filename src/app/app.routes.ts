import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { CashTransactionsComponent } from './features/cash-transactions/cash-transactions.component';
import { CurrentAccountsComponent } from './features/current-accounts/current-accounts.component';
import { HomeComponent } from './features/home/home.component';
import { CashTransactionDetailComponent } from './features/cash-transactions/cash-transaction-detail/cash-transaction-detail.component';

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

      { path: 'current-accounts', component: CurrentAccountsComponent },
    ],
  },
  {
    path: 'cash-transactions/detail/:id',
    component: CashTransactionDetailComponent,
  },
  { path: '**', component: LoginComponent },
];
