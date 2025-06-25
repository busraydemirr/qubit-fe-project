import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BnCreditCardItemModel } from '../../../models/bncreditcard/bncreditcard.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { BnCreditCardState } from '../../../state/bncreditcard/bncreditcard.state';
import { Store } from '@ngxs/store';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BnCreditCardActions } from '../../../state/bncreditcard/bncreditcard.action';
import { renderCardType, renderCreditType, renderCurrency } from '../../../utils/enum.utils';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bank-detail-credits',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './bank-detail-credits.component.html',
  styleUrl: './bank-detail-credits.component.scss'
})
export class BankDetailCreditsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() bankId!: number;

  public elements: BnCreditCardItemModel[] = [];
  public dataSource!: MatTableDataSource<BnCreditCardItemModel>;
  public displayedColumns = [
    'id',
    'code',
    'name',
    'bankAccDefinition',
    'credittype',
    'begdate',
    'enddate',
    'trcurr',
    'trtotal',
    'intrate',
    'inttotal',
    'commtotal'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public renderCardType = renderCardType;
  public renderCreditType = renderCreditType;
  public renderCurrency = renderCurrency;
  public subsink = new SubSink();

  constructor(private _store: Store) {
    this.loading$ = this._store.select(BnCreditCardState.getLoading);
  }

  public ngOnInit(): void {
    const filter = {
      filter: {
        field: 'bncrref',
        operator: 'eq',
        value: this.bankId.toString()
      }
    };
    const payload = {
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter
    };
    this._store.dispatch(new BnCreditCardActions.List(payload));

    this.subsink.sink = this._store.select(BnCreditCardState.getBnCreditCards).subscribe((cards: BnCreditCardItemModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<BnCreditCardItemModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(BnCreditCardState.getBnCreditCardQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public changePaginationEvents(event: PageEvent): void {
    const filter = {
      filter: {
        field: 'bncrref',
        operator: 'eq',
        value: this.bankId.toString()
      }
    };

    this._store.dispatch(
      new BnCreditCardActions.List({ size: event.pageSize, page: event.pageIndex, filter })
    );
  }
}
