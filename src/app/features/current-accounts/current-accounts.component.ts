import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../state/clcard/clcard.action';
import { BnCardActions } from '../../state/bncard/bncard.action';

@Component({
  selector: 'app-current-accounts',
  imports: [],
  templateUrl: './current-accounts.component.html',
  styleUrl: './current-accounts.component.scss'
})
export class CurrentAccountsComponent implements OnInit {
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new ClCardActions.List({ size: 10, page: 0, filter: {} }));
    this._store.dispatch(new BnCardActions.List({ size: 10, page: 0, filter: {} }));
  }

}
