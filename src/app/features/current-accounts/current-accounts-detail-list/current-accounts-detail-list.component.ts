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
import { renderCurrency, renderSign } from '../../../utils/enum.utils';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SubSink } from 'subsink';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClCardTotalModel } from '../../../models/clcard/clcard-total.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { InvoiceService } from '../../../services/invoice.service';
import { InvoiceActions } from '../../../state/invoice/invoice.action';
import { Router } from '@angular/router';
import { CsCardService } from '../../../services/cscard.service';
import { BnCardService } from '../../../services/bncard.service';
import { KsCardService } from '../../../services/kscard.service';

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
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: DateAdapter, useClass: MomentDateAdapter },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  templateUrl: './current-accounts-detail-list.component.html',
  styleUrl: './current-accounts-detail-list.component.scss'
})
export class CurrentAccountsDetailListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() cardId!: number;
  @Input() id!: string;

  public elements: ClCardLineModel[] = [];
  public dataSource!: MatTableDataSource<ClCardLineModel>;
  public displayedColumns = [
    'date',
    'trcurr',
    'debt',
    'credit',
    'cumulativeBalance',
    'trnet',
    'capiblockNameCreatedby',
    'capiblockCreadeddate',
    'capiblockModifieddate',
    'month',
    'year',
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
  public renderCurrency = renderCurrency;
  public subsink = new SubSink();
  public filterForm: FormGroup = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });
  public dateRange = new FormControl(null);

  constructor(
    private _store: Store,
    private invoiceService: InvoiceService,
    private _router: Router,
    private _csCardService: CsCardService,
    private _bnCardService: BnCardService,
    private _ksCardService: KsCardService
  ) {
    this.loading$ = this._store.select(ClCardState.getLinesListLoading);
    this.totals$ = this._store.select(ClCardState.getClCardTotals);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.cardId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {},
    };


    this._store.dispatch([new ClCardActions.GetClCardLines(payload)]);
    this.subsink.sink = this._store.select(ClCardState.getClCardLines).subscribe((cards: ClCardLineModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams);
    });


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
    const filter = this._store.selectSnapshot(ClCardState.getLinesFilter);
    this._store.dispatch(
      new ClCardActions.GetClCardLines({ id: this.cardId, size: event.pageSize, page: event.pageIndex, filter })
    );

  }

  public filter(): void {
    if (!this.filterForm?.value || this.filterForm.invalid) {
      return;
    }

    let filter: any = null;
    if (this.filterForm.value.start && this.filterForm.value.end) {
      filter = {
        start: this.filterForm.value.start ? moment(this.filterForm.value.start).toISOString() : null,
        end: this.filterForm.value.end ? moment(this.filterForm.value.end).toISOString() : null,
      };
    }

    if (!filter) {
      return;
    }

    this._store.dispatch(
      new ClCardActions.GetClCardLines({ id: this.cardId, size: this.queryParams.size, page: this.queryParams.page, filter })
    );
  }

  public rowClicked(row: ClCardLineModel): void {
    if (row.modulenr === 3 || row.modulenr === 5) {
      return; // Skip rows with modulenr 3 or 5
    }

    switch (row.modulenr) {
      case 4: // ınvoice
        this.invoiceService.getStLinesByInvoiceId(row.id!).subscribe((res) => {
          if (res && res.isSuccess && res.data) {
            this._router.navigate(['purchase-invoices/detail', res.data.invoiceref]);
          }
        });
        break;
      case 6: // CsTrans
        this._csCardService.getCsTrans(row.id!).subscribe((res) => {
          if (res && res.isSuccess && res.data) {
            this._router.navigate(['customer-promissory-notes/detail', res.data.csref]);
          }
        });
        break;
      case 61: // CsTrans
        this._csCardService.getCsTrans(row.id!).subscribe((res) => {
          if (res && res.isSuccess && res.data) {
            this._router.navigate(['customer-promissory-notes/detail', res.data.csref]);
          }
        });
        break;
      case 7: // BnCard
        this._bnCardService.getBnCardAccount(row.id!).subscribe((res) => {
          if (res && res.isSuccess && res.data) {
            this._router.navigate(['banks/detail', res.data.bankref]);
          }
        });
        break;
      case 10: // KsCard
        this._ksCardService.getKsCard(row.id!).subscribe((res) => {
          if (res && res.isSuccess && res.data) {
            this._router.navigate(['cash-transactions/detail', res.data.cardref]);
          }
        });
        break;
      default:
        console.warn('Unsupported modulenr:', row.modulenr);
    }
  }

  public clearFilters(): void {
    if (!this.filterForm?.value?.start && !this.filterForm?.value?.end) {
      return;
    }

    this.filterForm.reset();
    const queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams);
    this._store.dispatch(
      new ClCardActions.GetClCardLines({ id: this.cardId, size: queryParams.size, page: 0, filter: {} })
    );
  }
}
