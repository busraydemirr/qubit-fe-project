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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './current-accounts-detail-list.component.html',
  styleUrl: './current-accounts-detail-list.component.scss'
})
export class CurrentAccountsDetailListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() cardId!: number;
  @Input() term!: string;
  @Input() id!: string;

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
  public loading$!: Observable<boolean>;
  public totals$!: Observable<ClCardTotalModel>;
  public renderSign = renderSign;
  public renderAccountedInfo = renderAccountedInfo;
  public subsink = new SubSink();
  public termControl = new FormControl(['03']);

  constructor(private _store: Store) {
    if (!this.term || this.term === '03') {
      this.loading$ = this._store.select(ClCardState.getLinesListLoading);
      this.totals$ = this._store.select(ClCardState.getClCardTotals);
    } else if (this.term === '02') {
      this.loading$ = this._store.select(ClCardState.getLinesListLoading2);
    } else if (this.term === '01') {
      this.loading$ = this._store.select(ClCardState.getLinesListLoading1);
    }
  }

  public ngOnInit(): void {
    const payload = {
      id: this.cardId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {},
      term: this.term ?? '03'
    };

    if (!this.term || this.term === '03') {
      this._store.dispatch([new ClCardActions.GetClCardLines(payload)]);
      this.subsink.sink = this._store.select(ClCardState.getClCardLines).subscribe((cards: ClCardLineModel[]) => {
        this.elements = cards;
        this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
        this.queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams);
      });
    } else if (this.term === '02') {
      this._store.dispatch([new ClCardActions.GetClCardLines2(payload)]);
      this.subsink.sink = this._store.select(ClCardState.getClCardLines2).subscribe((cards: ClCardLineModel[]) => {
        this.elements = cards;
        this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
        this.queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams2);
      });
    } else if (this.term === '01') {
      this._store.dispatch([new ClCardActions.GetClCardLines1(payload)]);
      this.subsink.sink = this._store.select(ClCardState.getClCardLines1).subscribe((cards: ClCardLineModel[]) => {
        this.elements = cards;
        this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
        this.queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams1);
      });
    }

  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
    this.elements = [];
    this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
  }

  public changePaginationEvents(event: PageEvent): void {
    if (!this.term || this.term === '03') {
      this._store.dispatch(
        new ClCardActions.GetClCardLines({ id: this.cardId, size: event.pageSize, page: event.pageIndex, filter: {}, term: this.term ?? '03' })
      );
    } else if (this.term === '02') {
      this._store.dispatch(
        new ClCardActions.GetClCardLines2({ id: this.cardId, size: event.pageSize, page: event.pageIndex, filter: {}, term: this.term ?? '03' })
      );
    } else if (this.term === '01') {
      this._store.dispatch(
        new ClCardActions.GetClCardLines1({ id: this.cardId, size: event.pageSize, page: event.pageIndex, filter: {}, term: this.term ?? '03' })
      );
    }
  }
}
