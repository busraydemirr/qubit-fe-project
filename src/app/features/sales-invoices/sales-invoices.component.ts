import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InvoiceModel } from '../../models/invoices/invoice.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Store } from '@ngxs/store';
import { InvoiceState } from '../../state/invoice/invoice.state';
import { InvoiceActions } from '../../state/invoice/invoice.action';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-sales-invoices',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
    NgxSkeletonLoaderModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './sales-invoices.component.html',
  styleUrl: './sales-invoices.component.scss'
})
export class SalesInvoicesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: InvoiceModel[] = [];
  public dataSource!: MatTableDataSource<InvoiceModel>;
  public displayedColumns = [
    'ficheno',
    'clCardDefinition',
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public subsink = new SubSink();

  constructor(private _router: Router, private _store: Store) {
    this.loading$ = this._store.select(InvoiceState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new InvoiceActions.SalesInvoiceList({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

    this.subsink.sink = this._store.select(InvoiceState.getSalesInvoices).subscribe((invoices: InvoiceModel[]) => {
      this.elements = invoices;
      this.dataSource = new MatTableDataSource<InvoiceModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(InvoiceState.getSalesInvoiceQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public rowClicked(element: InvoiceModel): void {
    this._store.dispatch(new InvoiceActions.SetInvoice(element));
    this._router.navigate(['sales-invoices/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new InvoiceActions.SalesInvoiceList({ size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
