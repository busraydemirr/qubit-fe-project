import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BankAccountsComponent } from '../bank-accounts/bank-accounts.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BnCardItemModel } from '../../../models/bncard/bncard.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { BnCardState } from '../../../state/bncard/bncard.state';
import { BnCardActions } from '../../../state/bncard/bncard.action';
import { renderStatus } from '../../../utils/enum.utils';

@Component({
  selector: 'app-bank-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BankAccountsComponent,
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './bank-detail.component.html',
  styleUrl: './bank-detail.component.scss'
})
export class BankDetailComponent implements OnInit, OnDestroy {
  public bankId!: number;
  public bnCard$!: Observable<BnCardItemModel | null>;
  public loading$!: Observable<boolean>;
  public renderStatus = renderStatus;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.bankId = params['id'];
    });

    this.bnCard$ = this._store.select(BnCardState.getBnCardDetail);
    this.loading$ = this._store.select(BnCardState.getDetailLoading);

    const card: BnCardItemModel | null = this._store.selectSnapshot(BnCardState.getBnCardDetail);

    if (!card) {
      this._store.dispatch(new BnCardActions.GetBnCard(this.bankId!));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
