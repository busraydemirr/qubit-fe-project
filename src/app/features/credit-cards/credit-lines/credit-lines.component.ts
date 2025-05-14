import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BnCreditCardLineModel } from '../../../models/bncreditcard/bncreditcard-line.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { BnCreditCardState } from '../../../state/bncreditcard/bncreditcard.state';
import { Store } from '@ngxs/store';
import { BnCreditCardActions } from '../../../state/bncreditcard/bncreditcard.action';
import { renderCardType, renderCurrency } from '../../../utils/enum.utils';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-credit-lines',
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
  templateUrl: './credit-lines.component.html',
  styleUrl: './credit-lines.component.scss'
})
export class CreditLinesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() creditId!: number;

  public elements: BnCreditCardLineModel[] = [];
  public dataSource!: MatTableDataSource<BnCreditCardLineModel>;
  public displayedColumns = [
    "creditName",
    "pernr",
    "transtype",
    "totalAmount",
    "inttotal",
    "linenr",
    "duedate",
    "bnAccDefinition",
    "capiblockCreadeddate",
    "total"
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public renderCardType = renderCardType;
  public renderCurrency = renderCurrency;

  constructor(private _store: Store) {
    this.loading$ = this._store.select(BnCreditCardState.getLineListLoading);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.creditId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {}
    };
    this._store.dispatch(new BnCreditCardActions.GetBnCreditCardLines(payload));

    this._store.select(BnCreditCardState.getBnCreditCardLines).subscribe((cards: BnCreditCardLineModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<BnCreditCardLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(BnCreditCardState.getBnCreditCardLinesQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new BnCreditCardActions.GetBnCreditCardLines({ id: this.creditId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
