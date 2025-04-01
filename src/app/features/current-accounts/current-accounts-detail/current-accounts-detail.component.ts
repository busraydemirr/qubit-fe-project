import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrentAccountsDetailListComponent } from '../current-accounts-detail-list/current-accounts-detail-list.component';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClCardItemModel } from '../../../models/clcard/clcard.model';
import { ClCardState } from '../../../state/clcard/clcard.state';
import { AsyncPipe, NgIf } from '@angular/common';
import { ClCardActions } from '../../../state/clcard/clcard.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Status } from '../../../models/shared/status.enum';

@Component({
  selector: 'app-current-accounts-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CurrentAccountsDetailListComponent,
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './current-accounts-detail.component.html',
  styleUrl: './current-accounts-detail.component.scss',
})
export class CurrentAccountsDetailComponent implements OnInit, OnDestroy {
  public accountId!: number;
  public clCard$!: Observable<ClCardItemModel | undefined>;
  public loading$!: Observable<boolean>;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.accountId = params['id'];
    });

    this.clCard$ = this._store.select(ClCardState.getClCardDetail);
    this.loading$ = this._store.select(ClCardState.getDetailLoading);

    const card: ClCardItemModel | undefined = this._store.selectSnapshot(ClCardState.getClCardDetail);

    if (!card) {
      this._store.dispatch(new ClCardActions.GetClCard(this.accountId!));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }

  public renderCardStatus(status: number): Status | '' {
    switch (status) {
      case 0: return Status.PASSIVE;
      case 1: return Status.ACTIVE;
      default: return '';
    }
  }
}
