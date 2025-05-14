import { Component, OnDestroy, OnInit } from '@angular/core';
import { BnCreditCardItemModel } from '../../../models/bncreditcard/bncreditcard.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { BnCreditCardState } from '../../../state/bncreditcard/bncreditcard.state';
import { BnCreditCardActions } from '../../../state/bncreditcard/bncreditcard.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { BannerComponent } from '../../../components/banner/banner.component';
import { CreditLinesComponent } from '../credit-lines/credit-lines.component';
import { renderCreditType, renderCurrency } from '../../../utils/enum.utils';

@Component({
  selector: 'app-credit-card-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule,
    CreditLinesComponent,
    DatePipe,
    CommonModule
  ],
  templateUrl: './credit-card-detail.component.html',
  styleUrl: './credit-card-detail.component.scss'
})
export class CreditCardDetailComponent implements OnInit, OnDestroy {
  public creditId!: number;
  public bnCreditCard$!: Observable<BnCreditCardItemModel | null>;
  public loading$!: Observable<boolean>;
  public renderCreditType = renderCreditType;
  public renderCurrency = renderCurrency;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.creditId = params['id'];
    });

    this.bnCreditCard$ = this._store.select(BnCreditCardState.getBnCreditCardDetail);
    this.loading$ = this._store.select(BnCreditCardState.getDetailLoading);

    const card: BnCreditCardItemModel | null = this._store.selectSnapshot(BnCreditCardState.getBnCreditCardDetail);

    if (!card || !card?.id) {
      this._store.dispatch(new BnCreditCardActions.GetBnCreditCard(this.creditId!));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
