import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BnCreditCardItemModel } from '../../models/bncreditcard/bncreditcard.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { BnCreditCardState } from '../../state/bncreditcard/bncreditcard.state';
import { BnCreditCardActions } from '../../state/bncreditcard/bncreditcard.action';
import { FilterRequestModel } from '../../models/shared/filter-request.model';
import { SubSink } from 'subsink';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsyncPipe, CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { renderCurrency } from '../../utils/enum.utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-credit-cards',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DatePipe,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMomentDateModule
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: DateAdapter, useClass: MomentDateAdapter },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.scss'
})
export class CreditCardsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: BnCreditCardItemModel[] = [];
  public dataSource!: MatTableDataSource<BnCreditCardItemModel>;
  public displayedColumns = [
    'code',
    'name',
    'begdate',
    'enddate',
    'trtotal',
    'trcurr'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public bankFilterForm: FormGroup = new FormGroup({
    definition: new FormControl(null),
    date: new FormControl(null),
    start: new FormControl(null),
    end: new FormControl(null),
  });
  public subsink = new SubSink();
  public renderCurrency = renderCurrency;

  constructor(private _store: Store, private _router: Router) {
    this.loading$ = this._store.select(BnCreditCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new BnCreditCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

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

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public rowClicked(element: BnCreditCardItemModel): void {
    this._store.dispatch(new BnCreditCardActions.SetBnCreditCard(element));
    this._router.navigate(['credits/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new BnCreditCardActions.List({ size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }

  public filter(): void {
    if (!this.bankFilterForm?.value || this.bankFilterForm.invalid) {
      return;
    }

    let filter: FilterRequestModel | null = null;
    if (this.bankFilterForm.value.definition) {
      filter = {
        filter: {
          field: 'name',
          value: this.bankFilterForm.value.definition,
          operator: 'contains',
        }
      };

      if (this.bankFilterForm.value.date) {
        if (this.bankFilterForm.value.date === 'begdate' && this.bankFilterForm.value.start && this.bankFilterForm.value.end) {
          filter = {
            filter: {
              field: 'name',
              value: this.bankFilterForm.value.definition,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'begdate',
                value: moment(this.bankFilterForm.value.start).toISOString(),
                operator: 'gt',
              }, {
                field: 'begdate',
                value: moment(this.bankFilterForm.value.end).toISOString(),
                operator: 'lt',
              }]
            }
          };
        }

        if (this.bankFilterForm.value.date === 'enddate' && this.bankFilterForm.value.start && this.bankFilterForm.value.end) {
          filter = {
            filter: {
              field: 'name',
              value: this.bankFilterForm.value.definition,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'enddate',
                value: moment(this.bankFilterForm.value.start).toISOString(),
                operator: 'gt',
              }, {
                field: 'enddate',
                value: moment(this.bankFilterForm.value.end).toISOString(),
                operator: 'lt',
              }]
            }
          };
        }
      }
    } else {
      if (this.bankFilterForm.value.date) {
        if (this.bankFilterForm.value.date === 'begdate' && this.bankFilterForm.value.start && this.bankFilterForm.value.end) {
          filter = {
            filter: {
              field: 'begdate',
              value: moment(this.bankFilterForm.value.start).toISOString(),
              operator: 'gt',
              logic: "and",
              filters: [{
                field: 'begdate',
                value: moment(this.bankFilterForm.value.end).toISOString(),
                operator: 'lt',
              }]
            }
          };
        }

        if (this.bankFilterForm.value.date === 'enddate' && this.bankFilterForm.value.start && this.bankFilterForm.value.end) {
          filter = {
            filter: {
              field: 'enddate',
              value: moment(this.bankFilterForm.value.start).toISOString(),
              operator: 'gt',
              logic: "and",
              filters: [{
                field: 'enddate',
                value: moment(this.bankFilterForm.value.end).toISOString(),
                operator: 'lt',
              }]
            }
          };
        }
      }
    }

    if (!filter) {
      return;
    }
    console.log(filter);


    this._store.dispatch(
      new BnCreditCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter })
    );
  }

  public clearFilters(): void {
    if (!this.bankFilterForm?.value?.definition && !this.bankFilterForm?.value?.date) {
      return;
    }

    this.bankFilterForm.reset();
    const queryParams = this._store.selectSnapshot(BnCreditCardState.getBnCreditCardQueryParams);
    this._store.dispatch(
      new BnCreditCardActions.List({ size: queryParams.size, page: 0, filter: {} })
    );
  }
}
