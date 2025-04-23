import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { Store } from '@ngxs/store';
import { BannerComponent } from '../../components/banner/banner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrficheDetailListComponent } from './orfiche-detail-list/orfiche-detail-list.component';
import { OrficheModel } from '../../models/orfiche/orfiche.model';
import { OrficheState } from '../../state/orfiche/orfiche.state';
import { OrficheActions } from '../../state/orfiche/orfiche.action';
import { renderOrficheStatus } from '../../utils/enum.utils';

@Component({
  selector: 'app-orfiche-detail',
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
    OrficheDetailListComponent,
    DatePipe
  ],
  templateUrl: './orfiche-detail.component.html',
  styleUrl: './orfiche-detail.component.scss'
})
export class OrficheDetailComponent implements OnInit, OnDestroy {
  public orficheId!: number;
  public orfiche$!: Observable<OrficheModel>;
  public loading$!: Observable<boolean>;
  public term!: string;
  public renderOrficheStatus = renderOrficheStatus;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.orficheId = params['id'];
    });
    this._subSink.sink = this.route.url.subscribe((urls: UrlSegment[]) => {
      this.term = urls[0].toString().includes('received') ?
        this._store.selectSnapshot(OrficheState.getReceivedOrficheTerm) : this._store.selectSnapshot(OrficheState.getPlacedOrficheTerm);
    });
    this.orfiche$ = this._store.select(OrficheState.getorficheDetail);
    this.loading$ = this._store.select(OrficheState.getDetailLoading);

    const orfiche: OrficheModel | undefined = this._store.selectSnapshot(OrficheState.getorficheDetail);

    if (!orfiche || !orfiche.id) {
      this._store.dispatch(new OrficheActions.GetOrfiche({ id: this.orficheId!, term: this.term }));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
