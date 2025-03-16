import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-current-accounts-detail-list',
  imports: [],
  templateUrl: './current-accounts-detail-list.component.html',
  styleUrl: './current-accounts-detail-list.component.scss'
})
export class CurrentAccountsDetailListComponent {
  @Input() cardId!: number;

  constructor(private _store: Store) {

  }
}
