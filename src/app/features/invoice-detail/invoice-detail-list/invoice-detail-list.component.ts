import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InvoiceLineModel } from '../../../models/invoices/invoice-line.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { renderSign } from '../../../utils/enum.utils';
import { Store } from '@ngxs/store';
import { InvoiceState } from '../../../state/invoice/invoice.state';
import { InvoiceActions } from '../../../state/invoice/invoice.action';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-invoice-detail-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    DatePipe
  ],
  templateUrl: './invoice-detail-list.component.html',
  styleUrl: './invoice-detail-list.component.scss'
})
export class InvoiceDetailListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() invoiceId!: number;

  public elements: InvoiceLineModel[] = [];
  public dataSource!: MatTableDataSource<InvoiceLineModel>;
  public displayedColumns = [
    'date',
    'lineexp',
    'amount'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public renderSign = renderSign;

  constructor(private _store: Store) {
    this.loading$ = this._store.select(InvoiceState.getLinesListLoading);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.invoiceId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {}
    };
    this._store.dispatch(new InvoiceActions.GetInvoiceLines(payload));

    this._store.select(InvoiceState.getInvoiceLines).subscribe((invoices: InvoiceLineModel[]) => {
      this.elements = invoices;
      this.dataSource = new MatTableDataSource<InvoiceLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(InvoiceState.getInvoiceLineQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new InvoiceActions.GetInvoiceLines
      ({ id: this.invoiceId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
