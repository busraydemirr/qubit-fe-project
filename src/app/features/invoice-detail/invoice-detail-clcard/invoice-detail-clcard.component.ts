import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../../state/clcard/clcard.action';
import { ClCardState } from '../../../state/clcard/clcard.state';
import { Observable } from 'rxjs';
import { ClCardItemModel } from '../../../models/clcard/clcard.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { renderClCardType, renderRectStatus, renderStatus } from '../../../utils/enum.utils';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-invoice-detail-clcard',
  imports: [
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './invoice-detail-clcard.component.html',
  styleUrl: './invoice-detail-clcard.component.scss'
})
export class InvoiceDetailClcardComponent {
  @Input()
  get clCardId(): number {
    return this._clCardId;
  }
  set clCardId(newclCardId: number) {
    if (newclCardId) {
      this._store.dispatch(new ClCardActions.GetClCard(newclCardId));
      this._clCardId = newclCardId;
    }
  }
  private _clCardId!: number;
  public clCard$!: Observable<ClCardItemModel | undefined>;
  public loading$!: Observable<boolean>;
  public renderRecStatus = renderRectStatus;
  public renderStatus = renderStatus;
  public renderClCardType = renderClCardType;

  constructor(private _store: Store) {
    this.clCard$ = this._store.select(ClCardState.getClCardDetail);
    this.loading$ = this._store.select(ClCardState.getDetailLoading);
  }
}
