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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SubSink } from 'subsink';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { FilterRequestModel } from '../../models/shared/filter-request.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { renderCurrency } from '../../utils/enum.utils';
import { TimePeriodEnum } from '../../models/shared/time-period.enum';

export const MY_FORMATS = {
  parse: {
    dateInput: ['DD/MM/YYYY'],
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

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
    AsyncPipe,
    DatePipe,
    MatDatepickerModule,
    MatSelectModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: DateAdapter, useClass: MomentDateAdapter },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
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
    'date',
    'nettotal',
    'genexp1',
    'trcurr'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public subsink = new SubSink();
  public invoiceFilterForm: FormGroup = new FormGroup({
    clCardDefinition: new FormControl(null),
    start: new FormControl(null),
    end: new FormControl(null),
  });
  public renderCurrency = renderCurrency;
  private _filter!: FilterRequestModel;

  constructor(private _router: Router, private _store: Store, private _route: ActivatedRoute) {
    this.loading$ = this._store.select(InvoiceState.getLoading);

    this.subsink.sink = this._route.queryParams.subscribe((queryParams) => {
      if (queryParams?.['timePeriod']) {
        this._setFilter(queryParams['timePeriod'], 'date');
      }
    });
  }

  private _setFilter(timePeriod: TimePeriodEnum, field: string) {
    if (timePeriod === TimePeriodEnum.TODAY) {
      this._filter = {
        filter: {
          field,
          value: moment().subtract(1, 'd').toISOString(),
          operator: 'lt'
        }
      }
    }

    if (timePeriod === TimePeriodEnum.WEEK) {
      this._filter = {
        filter: {
          field,
          value: moment().subtract(7, 'd').toISOString(),
          operator: 'lt'
        }
      }
    }

    if (timePeriod === TimePeriodEnum.MONTH) {
      this._filter = {
        filter: {
          field,
          value: moment().subtract(30, 'd').toISOString(),
          operator: 'lt'
        }
      }
    }

    if (timePeriod === TimePeriodEnum.THREE_MONTHS) {
      this._filter = {
        filter: {
          field,
          value: moment().subtract(90, 'd').toISOString(),
          operator: 'lt'
        }
      }
    }
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new InvoiceActions.PurchaseInvoiceList({ size: this.queryParams.size, page: this.queryParams.page, filter: this._filter ?? {} })
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
    this._store.dispatch(new InvoiceActions.ResetPurchaseInvoiceQueryParams());
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

  public filter(): void {
    if (!this.invoiceFilterForm?.value || this.invoiceFilterForm.invalid) {
      return;
    }

    let filter: FilterRequestModel | null = null;
    if (this.invoiceFilterForm.value.clCardDefinition) {
      filter = {
        filter: {
          field: 'clCard.definition',
          value: this.invoiceFilterForm.value.clCardDefinition,
          operator: 'contains',
        }
      };


      if (this.invoiceFilterForm.value.start && this.invoiceFilterForm.value.end) {
        filter = {
          filter: {
            field: 'clCard.definition',
            value: this.invoiceFilterForm.value.clCardDefinition,
            operator: 'contains',
            logic: "and",
            filters: [{
              field: 'date',
              value: moment(this.invoiceFilterForm.value.start).toISOString(),
              operator: 'gt',
            }, {
              field: 'date',
              value: moment(this.invoiceFilterForm.value.end).toISOString(),
              operator: 'lt',
            }]
          }
        };

      }
    } else {
      if (this.invoiceFilterForm.value.start && this.invoiceFilterForm.value.end) {
        filter = {
          filter: {
            field: 'date',
            value: moment(this.invoiceFilterForm.value.start).toISOString(),
            operator: 'gt',
            logic: "and",
            filters: [{
              field: 'date',
              value: moment(this.invoiceFilterForm.value.end).toISOString(),
              operator: 'lt',
            }]
          }
        };
      }
    }


    if (!filter) {
      return;
    }

    this._store.dispatch(
      new InvoiceActions.PurchaseInvoiceList({ size: this.queryParams.size, page: this.queryParams.page, filter })
    );


  }

  public clearFilters(): void {
    if (!this.invoiceFilterForm?.value?.clCardDefinition && !this.invoiceFilterForm?.value?.start && !this.invoiceFilterForm?.value?.end) {
      return;
    }

    this.invoiceFilterForm.reset();
    const queryParams = this._store.selectSnapshot(InvoiceState.getPurchaseInvoiceQueryParams);
    this._store.dispatch(
      new InvoiceActions.PurchaseInvoiceList({ size: queryParams.size, page: 0, filter: {} })
    );
  }
}
