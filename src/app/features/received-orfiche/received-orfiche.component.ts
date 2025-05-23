import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
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
import { OrficheState } from '../../state/orfiche/orfiche.state';
import { OrficheActions } from '../../state/orfiche/orfiche.action';
import { OrficheModel } from '../../models/orfiche/orfiche.model';
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
  selector: 'app-received-orfiche',
  imports: [
    MatTableModule,
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
  templateUrl: './received-orfiche.component.html',
  styleUrl: './received-orfiche.component.scss'
})
export class ReceivedOrficheComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: OrficheModel[] = [];
  public dataSource!: MatTableDataSource<OrficheModel>;
  public displayedColumns = [
    'ficheno',
    'clCardDefinition',
    'trcurr',
    'totalAmountPrice',
    'allShippedAmountPrice',
    'amountOfRemainingPrice',
    'date',
    'nettotal',
    'genexp1',
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public subsink = new SubSink();
  public termControl = new FormControl('03');
  public orficheFilterForm: FormGroup = new FormGroup({
    clCardDefinition: new FormControl(null),
    start: new FormControl(null),
    end: new FormControl(null),
  });
  public renderCurrency = renderCurrency;

  private _filter!: FilterRequestModel;

  constructor(private _router: Router, private _store: Store, private _route: ActivatedRoute) {
    this.loading$ = this._store.select(OrficheState.getLoading);

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
      new OrficheActions.ReceivedOrficheList({ size: this.queryParams.size, page: this.queryParams.page, filter: this._filter ?? {}, term: this.termControl.value! })
    );

    this.subsink.sink = this._store.select(OrficheState.getreceivedorfiches).subscribe((orfiches: OrficheModel[]) => {
      this.elements = orfiches;
      this.dataSource = new MatTableDataSource<OrficheModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(OrficheState.getreceivedorficheQueryParams);
    });

    this.subsink.sink = this.termControl.valueChanges.subscribe((value) => {
      const queryParams = this._store.selectSnapshot(OrficheState.getreceivedorficheQueryParams);
      const filter = this._store.selectSnapshot(OrficheState.getReceivedOrficheFilters);
      const payload = {
        size: queryParams.size,
        page: 0,
        term: value!,
        filter: filter ?? {},
      };
      this._store.dispatch(new OrficheActions.ReceivedOrficheList(payload));
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public rowClicked(element: OrficheModel): void {
    this._store.dispatch(new OrficheActions.SetOrfiche(element));
    this._router.navigate(['received-orfiches/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    const filter = this._store.selectSnapshot(OrficheState.getReceivedOrficheFilters);
    const term = this._store.selectSnapshot(OrficheState.getReceivedOrficheTerm);
    this._store.dispatch(
      new OrficheActions.ReceivedOrficheList({ size: event.pageSize, page: event.pageIndex, filter, term })
    );
  }

  public filter(): void {
    if (!this.orficheFilterForm?.value || this.orficheFilterForm.invalid) {
      return;
    }

    let filter: FilterRequestModel | null = null;
    if (this.orficheFilterForm.value.clCardDefinition) {
      filter = {
        filter: {
          field: 'clCard.definition',
          value: this.orficheFilterForm.value.clCardDefinition,
          operator: 'contains',
        }
      };


      if (this.orficheFilterForm.value.start && this.orficheFilterForm.value.end) {
        filter = {
          filter: {
            field: 'clCard.definition',
            value: this.orficheFilterForm.value.clCardDefinition,
            operator: 'contains',
            logic: "and",
            filters: [{
              field: 'date',
              value: moment(this.orficheFilterForm.value.start).toISOString(),
              operator: 'gt',
            }, {
              field: 'date',
              value: moment(this.orficheFilterForm.value.end).toISOString(),
              operator: 'lt',
            }]
          }
        };

      }
    } else {
      if (this.orficheFilterForm.value.start && this.orficheFilterForm.value.end) {
        filter = {
          filter: {
            field: 'date',
            value: moment(this.orficheFilterForm.value.start).toISOString(),
            operator: 'gt',
            logic: "and",
            filters: [{
              field: 'date',
              value: moment(this.orficheFilterForm.value.end).toISOString(),
              operator: 'lt',
            }]
          }
        };
      }
    }


    if (!filter) {
      return;
    }

    const term = this._store.selectSnapshot(OrficheState.getReceivedOrficheTerm);
    const queryParams = this._store.selectSnapshot(OrficheState.getreceivedorficheQueryParams);
    this._store.dispatch(
      new OrficheActions.ReceivedOrficheList({ size: queryParams.size, page: 0, filter, term })
    );


  }

  public clearFilters(): void {
    if (!this.orficheFilterForm?.value?.clCardDefinition && !this.orficheFilterForm?.value?.start && !this.orficheFilterForm?.value?.end) {
      return;
    }

    this.orficheFilterForm.reset();
    const queryParams = this._store.selectSnapshot(OrficheState.getreceivedorficheQueryParams);
    const term = this._store.selectSnapshot(OrficheState.getReceivedOrficheTerm);
    this._store.dispatch(
      new OrficheActions.ReceivedOrficheList({ size: queryParams.size, page: 0, filter: {}, term })
    );
  }
}
