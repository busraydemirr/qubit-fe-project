import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bank-accounts',
  imports: [],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})
export class BankAccountsComponent {
  @Input() bankId!: number;
}
