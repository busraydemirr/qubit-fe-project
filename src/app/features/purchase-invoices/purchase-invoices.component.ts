import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { InvoiceModel } from '../../models/invoices/invoice.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { InvoiceState } from '../../state/invoice/invoice.state';
import { InvoiceActions } from '../../state/invoice/invoice.action';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-purchase-invoices',
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
  templateUrl: './purchase-invoices.component.html',
  styleUrl: './purchase-invoices.component.scss'
})
export class PurchaseInvoicesComponent implements OnInit, AfterViewInit, OnDestroy {
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
      new InvoiceActions.PurchaseInvoiceList({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

    this.subsink.sink = this._store.select(InvoiceState.getPurchaseInvoices).subscribe((invoices: InvoiceModel[]) => {
      this.elements = invoices;
      this.dataSource = new MatTableDataSource<InvoiceModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(InvoiceState.getPurchaseInvoiceQueryParams);
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
    this._router.navigate(['purchase-invoices/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new InvoiceActions.PurchaseInvoiceList({ size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
