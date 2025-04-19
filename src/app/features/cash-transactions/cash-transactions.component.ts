import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { KsCardState } from '../../state/kscard/kscard.state';
import { KsCardActions } from '../../state/kscard/kscard.action';
import { KsCardModel } from '../../models/kscard/kscard.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { renderRectStatus } from '../../utils/enum.utils';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterRequestModel } from '../../models/shared/filter-request.model';

@Component({
  selector: 'app-cash-transactions',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
    NgxSkeletonLoaderModule,
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cash-transactions.component.html',
  styleUrl: './cash-transactions.component.scss',
})
export class CashTransactionsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: KsCardModel[] = [];
  public dataSource!: MatTableDataSource<KsCardModel>;
  public displayedColumns = [
    'code',
    'name',
    'explain',
    'recstatus',
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public renderRectStatus = renderRectStatus;
  public cashFilterForm: FormGroup = new FormGroup({
    name: new FormControl(null),
  });

  constructor(private _router: Router, private _store: Store) {
    this.loading$ = this._store.select(KsCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new KsCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

    this._store.select(KsCardState.getKsCards).subscribe((cards: KsCardModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<KsCardModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(KsCardState.getKsCardQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public checkedChanged(event: MatCheckboxChange, element: KsCardModel): void {
    element.select = event.checked;
  }

  public rowClicked(element: KsCardModel): void {
    this._store.dispatch(new KsCardActions.SetKsCard(element));
    this._router.navigate(['cash-transactions/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new KsCardActions.List({ size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }



  public clearFilters(): void {
    if (!this.cashFilterForm?.value?.name) {
      return;
    }

    this.cashFilterForm.reset();
    const queryParams = this._store.selectSnapshot(KsCardState.getKsCardQueryParams);
    this._store.dispatch(
      new KsCardActions.List({ size: queryParams.size, page: queryParams.page, filter: {} })
    );
  }

  public filter(): void {
    if (!this.cashFilterForm?.value || this.cashFilterForm.invalid) {
      return;
    }

    let filter: FilterRequestModel | null = null;
    if (this.cashFilterForm.value.name) {
      filter = {
        filter: {
          field: 'name',
          value: this.cashFilterForm.value.name,
          operator: 'contains',
        }
      };
    }

    if (!filter) {
      return;
    }

    const queryParams = this._store.selectSnapshot(KsCardState.getKsCardQueryParams);
    this._store.dispatch(
      new KsCardActions.List({ size: queryParams.size, page: queryParams.page, filter })
    );
  }
}