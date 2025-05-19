import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../state/clcard/clcard.action';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule, NgClass, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClCardItemModel } from '../../models/clcard/clcard.model';
import { ClCardState } from '../../state/clcard/clcard.state';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FilterRequestModel } from '../../models/shared/filter-request.model';
import { SubSink } from 'subsink';
import { renderCurrency } from '../../utils/enum.utils';

@Component({
  selector: 'app-current-accounts',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInput,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './current-accounts.component.html',
  styleUrl: './current-accounts.component.scss',
})
export class CurrentAccountsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: ClCardItemModel[] = [];
  public dataSource!: MatTableDataSource<ClCardItemModel>;
  public displayedColumns = [
    'code',
    'name',
    'ccurrency',
    'totalBalance',
    'country',
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public accountFilterForm: FormGroup = new FormGroup({
    definition: new FormControl(null),
    phoneNumber: new FormControl(null),
    emailaddr: new FormControl(null),
  });
  public renderCurrency = renderCurrency;
  public subsink = new SubSink();

  constructor(private _store: Store, private _router: Router) {
    this.loading$ = this._store.select(ClCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new ClCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

    this.subsink.sink = this._store.select(ClCardState.getClCards).subscribe((cards: ClCardItemModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<ClCardItemModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(ClCardState.getClCardQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public checkedChanged(
    event: MatCheckboxChange,
    element: ClCardItemModel
  ): void {
    element.select = event.checked;
  }

  public rowClicked(element: ClCardItemModel): void {
    this._store.dispatch(new ClCardActions.SetClCard(element));
    this._router.navigate(['current-accounts/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    const filter = this._store.selectSnapshot(ClCardState.getClCardFilter);
    this._store.dispatch(
      new ClCardActions.List({ size: event.pageSize, page: event.pageIndex, filter: filter ?? {} })
    );
  }

  public clearFilters(): void {
    if (!this.accountFilterForm?.value?.definition && !this.accountFilterForm?.value?.phoneNumber && !this.accountFilterForm?.value?.emailaddr) {
      return;
    }

    this.accountFilterForm.reset();
    const queryParams = this._store.selectSnapshot(ClCardState.getClCardQueryParams);
    this._store.dispatch(
      new ClCardActions.List({ size: queryParams.size, page: 0, filter: {} })
    );
  }

  public announceSortChange(event: any): void {
    const queryParams = this._store.selectSnapshot(ClCardState.getClCardQueryParams);
    const filter = this._store.selectSnapshot(ClCardState.getClCardFilter);
    const newFilter: FilterRequestModel = {
      sort: [{
        field: event.active,
        dir: event.direction
      }],
      ...filter?.filter ? { filter: filter?.filter } : {},
    };
    this._store.dispatch(
      new ClCardActions.List({ size: queryParams.size, page: queryParams.page, filter: newFilter ?? {} })
    );
  }

  public filter(): void {
    const oldfilter = this._store.selectSnapshot(ClCardState.getClCardFilter);

    if (!this.accountFilterForm?.value || this.accountFilterForm.invalid) {
      return;
    }

    let filter: FilterRequestModel | null = null;
    if (this.accountFilterForm.value.definition) {
      filter = {
        filter: {
          field: 'definition',
          value: this.accountFilterForm.value.definition,
          operator: 'contains',
        }
      };

      if (this.accountFilterForm.value.phoneNumber) {
        filter = {
          filter: {
            field: 'definition',
            value: this.accountFilterForm.value.definition,
            operator: 'contains',
            logic: "and",
            filters: [{
              field: 'telnrs1',
              value: this.accountFilterForm.value.phoneNumber.toString(),
              operator: 'eq',
            }]
          }
        };

        if (this.accountFilterForm.value.emailaddr) {
          filter = {
            filter: {
              field: 'definition',
              value: this.accountFilterForm.value.definition,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'telnrs1',
                value: this.accountFilterForm.value.phoneNumber.toString(),
                operator: 'eq',
              },
              {
                field: "emailaddr",
                value: this.accountFilterForm.value.emailaddr,
                operator: 'contains'
              }]
            }
          };
        }
      } else {
        if (this.accountFilterForm.value.emailaddr) {
          filter = {
            filter: {
              field: 'definition',
              value: this.accountFilterForm.value.definition,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'emailaddr',
                value: this.accountFilterForm.value.emailaddr,
                operator: 'contains',
              }]
            }
          };
        }
      }
    } else {
      if (this.accountFilterForm.value.emailaddr) {
        filter = {
          filter: {
            field: 'emailaddr',
            value: this.accountFilterForm.value.emailaddr,
            operator: 'contains',
          }
        };

        if (this.accountFilterForm.value.phoneNumber) {
          filter = {
            filter: {
              field: 'emailaddr',
              value: this.accountFilterForm.value.emailaddr,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'telnrs1',
                value: this.accountFilterForm.value.phoneNumber.toString(),
                operator: 'eq',
              }]
            }
          };
        }
      } else {
        if (this.accountFilterForm.value.phoneNumber) {
          filter = {
            filter: {
              field: 'telnrs1',
              value: this.accountFilterForm.value.phoneNumber.toString(),
              operator: 'eq',
            }
          };
        }
      }
    }

    if (!filter) {
      return;
    }

    const queryparams = this._store.selectSnapshot(ClCardState.getClCardQueryParams);
    this._store.dispatch(
      new ClCardActions.List({ size: queryparams.size, page: 0, filter: { filter: filter.filter, ...oldfilter.sort ? { sort: oldfilter.sort } : {} } })
    );
  }
}