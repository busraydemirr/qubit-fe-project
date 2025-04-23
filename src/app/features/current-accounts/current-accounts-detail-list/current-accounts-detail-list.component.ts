import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../../state/clcard/clcard.action';
import { ClCardState } from '../../../state/clcard/clcard.state';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ClCardLineModel } from '../../../models/clcard/clcard-line.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { KsCardState } from '../../../state/kscard/kscard.state';
import { renderAccountedInfo, renderSign } from '../../../utils/enum.utils';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SubSink } from 'subsink';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClCardTotalModel } from '../../../models/clcard/clcard-total.model';

@Component({
  selector: 'app-current-accounts-detail-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    DatePipe,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './current-accounts-detail-list.component.html',
  styleUrl: './current-accounts-detail-list.component.scss'
})
export class CurrentAccountsDetailListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() cardId!: number;

  public elements: ClCardLineModel[] = [];
  public dataSource!: MatTableDataSource<ClCardLineModel>;
  public displayedColumns = [
    'date',
    'lineexp',
    'sign',
    'amount',
    'cyphcode',
    'tranno',
    'accounted',
    'trnet',
    'reportrate',
    'reportnet',
    'capiblockNameCreatedby',
    'capiblockCreadeddate',
    'capiblockModifieddate',
    'month',
    'year',
    'affectrisk'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public totals$: Observable<ClCardTotalModel>;
  public renderSign = renderSign;
  public renderAccountedInfo = renderAccountedInfo;
  public subsink = new SubSink();
  public termControl = new FormControl('03');

  constructor(private _store: Store) {
    this.loading$ = this._store.select(KsCardState.getLinesListLoading);
    this.totals$ = this._store.select(ClCardState.getClCardTotals);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.cardId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {}
    };
    this._store.dispatch([new ClCardActions.GetClCardLines(payload), new ClCardActions.GetClCardTotals(this.cardId)]);

    this.subsink.sink = this._store.select(ClCardState.getClCardLines).subscribe((cards: ClCardLineModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams);
    });

    this.subsink.sink = this.termControl.valueChanges.subscribe((term: any) => {
      const queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams);
      const payload = {
        id: this.cardId,
        size: queryParams.size,
        page: 0,
        filter: {},
        term,
      };

      this._store.dispatch([new ClCardActions.GetClCardLines(payload), new ClCardActions.GetClCardTotals(this.cardId)]);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new ClCardActions.GetClCardLines({ id: this.cardId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
