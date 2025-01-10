import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { CashTransactionsComponent } from './features/cash-transactions/cash-transactions.component';
import { CurrentAccountsComponent } from './features/current-accounts/current-accounts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      { path: '', redirectTo: 'cash-transactions', pathMatch: 'full' },
      { path: 'cash-transactions', component: CashTransactionsComponent },
      { path: 'current-accounts', component: CurrentAccountsComponent },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
