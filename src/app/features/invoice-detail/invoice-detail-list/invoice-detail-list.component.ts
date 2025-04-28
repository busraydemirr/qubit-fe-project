import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InvoiceLineModel } from '../../../models/invoices/invoice-line.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { renderCurrency, renderIoCode, renderLineType, renderSign, renderTrCode } from '../../../utils/enum.utils';
import { Store } from '@ngxs/store';
import { InvoiceState } from '../../../state/invoice/invoice.state';
import { InvoiceActions } from '../../../state/invoice/invoice.action';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-detail-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    DatePipe,
    CommonModule
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
    "clCardDefinition",
    "itemCode",
    "itemName",
    "unitName",
    "stockref",
    "linetype",
    "trcode",
    "date",
    "iocode",
    "invoiceref",
    "delvrycode",
    "amount",
    "price",
    "total",
    "prcurr",
    "reportrate",
    "lineexp",
    "uomref",
    "plnamount",
    "vat",
    "vatamnt",
    "vatmatrah",
    "billed",
    "linenet",
    "prrate",
    "ordficheref",
    "month",
    "year",
    "affectrisk"
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public renderSign = renderSign;
  public renderCurrency = renderCurrency;
  public renderLineType = renderLineType;
  public renderTrCode = renderTrCode;
  public renderIoCode = renderIoCode;

  constructor(private _store: Store, private _router: Router) {
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

  public rowClicked(element: InvoiceLineModel): void {
    /*   this._store.dispatch(new BnCardActions.SetBnCard(element)); */
    this._router.navigate(['current-accounts/detail', element.clientref]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new InvoiceActions.GetInvoiceLines
        ({ id: this.invoiceId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
