import { Component, OnDestroy, OnInit } from '@angular/core';
import { CsCardModel } from '../../models/cscard/cscard.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { Store } from '@ngxs/store';
import { CsCardState } from '../../state/cscard/cscard.state';
import { CsCardActions } from '../../state/cscard/cscard.action';
import { BannerComponent } from '../../components/banner/banner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PromissoryNoteDetailListComponent } from './promissory-note-detail-list/promissory-note-detail-list.component';

@Component({
  selector: 'app-promissory-note-detail',
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
    DatePipe,
    PromissoryNoteDetailListComponent,
    CommonModule
  ],
  templateUrl: './promissory-note-detail.component.html',
  styleUrl: './promissory-note-detail.component.scss'
})
export class PromissoryNoteDetailComponent implements OnInit, OnDestroy {
  public csCardId!: number;
  public csCard$!: Observable<CsCardModel>;
  public loading$!: Observable<boolean>;
  public term!: string;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.csCardId = params['id'];
    });
    this._subSink.sink = this.route.url.subscribe((urls: UrlSegment[]) => {
      this.term = urls[0].toString().includes('customer') ?
        this._store.selectSnapshot(CsCardState.getCekTerm) : this._store.selectSnapshot(CsCardState.getPimakTerm);
    });
    this.csCard$ = this._store.select(CsCardState.getCsCardDetail);
    this.loading$ = this._store.select(CsCardState.getDetailLoading);

    const csCard: CsCardModel | undefined = this._store.selectSnapshot(CsCardState.getCsCardDetail);

    if (!csCard || !csCard.id) {
      this._store.dispatch(new CsCardActions.GetCsCard({ id: this.csCardId!, term: this.term }));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
