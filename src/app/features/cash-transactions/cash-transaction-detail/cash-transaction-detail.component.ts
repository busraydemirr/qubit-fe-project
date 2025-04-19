import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { ActivatedRoute, Params } from '@angular/router';
import { SubSink } from 'subsink';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CashTransactionDetailListComponent } from '../cash-transaction-detail-list/cash-transaction-detail-list.component';
import { Observable } from 'rxjs';
import { KsCardModel } from '../../../models/kscard/kscard.model';
import { Store } from '@ngxs/store';
import { KsCardState } from '../../../state/kscard/kscard.state';
import { KsCardActions } from '../../../state/kscard/kscard.action';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { renderRectStatus, renderStatus } from '../../../utils/enum.utils';
@Component({
  selector: 'app-cash-transaction-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CashTransactionDetailListComponent,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './cash-transaction-detail.component.html',
  styleUrl: './cash-transaction-detail.component.scss',
})
export class CashTransactionDetailComponent implements OnInit, OnDestroy {
  public cashId!: number;
  public ksCard$!: Observable<KsCardModel>;
  public loading$!: Observable<boolean>;
  public renderRectStatus = renderRectStatus;
  public renderStatus = renderStatus;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.cashId = params['id'];
    });

    this.ksCard$ = this._store.select(KsCardState.getKsCardDetail);
    this.loading$ = this._store.select(KsCardState.getDetailLoading);

    const card: KsCardModel = this._store.selectSnapshot(KsCardState.getKsCardDetail);

    if (!card || !card.id) {
      this._store.dispatch(new KsCardActions.GetKsCard(this.cashId!));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

  public filter(): void { }
}
