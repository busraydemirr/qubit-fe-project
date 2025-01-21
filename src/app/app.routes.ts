import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { CashTransactionsComponent } from './features/cash-transactions/cash-transactions.component';
import { CurrentAccountsComponent } from './features/current-accounts/current-accounts.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'cash-transactions',
        component: CashTransactionsComponent,
      },
      // { path: 'cash-transactions/detail/:id', component: HomeComponent },
      { path: 'current-accounts', component: CurrentAccountsComponent },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
