import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { KsCardState } from '../../../state/kscard/kscard.state';
import { Store } from '@ngxs/store';
import { KsCardLineModel } from '../../../models/kscard/kscard-line.model';
import { KsCardActions } from '../../../state/kscard/kscard.action';
import { renderSign } from '../../../utils/enum.utils';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cash-transaction-detail-list',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './cash-transaction-detail-list.component.html',
  styleUrl: './cash-transaction-detail-list.component.scss',
})
export class CashTransactionDetailListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() cashId!: number;

  public elements: KsCardLineModel[] = [];
  public dataSource!: MatTableDataSource<KsCardLineModel>;
  public displayedColumns = [
    'custtitle',
    'ficheno',
    'sign',
    'amount',
    'date',
    'branch',
    'lineexp',
    'reportrate',
    'trrate',
    'trnet',
    'trcurr',
    'capiblockNameCreatedby',
    'capiblockCreadeddate'

  ];
  public termControl = new FormControl('03');
  public subsink = new SubSink();

  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public renderSign = renderSign;

  constructor(private _store: Store, private _router: Router) {
    this.loading$ = this._store.select(KsCardState.getLinesListLoading);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.cashId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {}
    };
    this._store.dispatch(new KsCardActions.GetKsCardLines(payload));

    this.subsink.sink = this._store.select(KsCardState.getKsCardLines).subscribe((cards: KsCardLineModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<KsCardLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(KsCardState.getKsCardLineQueryParams);
    });

    this.subsink.sink = this.termControl.valueChanges.subscribe((term: any) => {
      const queryParams = this._store.selectSnapshot(KsCardState.getKsCardLineQueryParams);
      const filter = this._store.selectSnapshot(KsCardState.getKsCardLineFilter);
      const payload = {
        id: this.cashId,
        size: queryParams.size,
        page: 0,
        filter,
        term,
      };

      this._store.dispatch(new KsCardActions.GetKsCardLines(payload));
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new KsCardActions.GetKsCardLines({ id: this.cashId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }

  public rowClicked(element: KsCardLineModel): void {
    this._router.navigate(['current-accounts/detail', element.cardref]);
  }
}
