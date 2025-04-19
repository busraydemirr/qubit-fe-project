import { Component, ViewChild } from '@angular/core';
import { BnCardActions } from '../../state/bncard/bncard.action';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { BnCardState } from '../../state/bncard/bncard.state';
import { BnCardItemModel } from '../../models/bncard/bncard.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FilterRequestModel } from '../../models/shared/filter-request.model';

@Component({
  selector: 'app-bank',
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
    MatInputModule
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.scss'
})
export class BankComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: BnCardItemModel[] = [];
  public dataSource!: MatTableDataSource<BnCardItemModel>;
  public displayedColumns = [
    'code',
    'name',
    'branch',
    'town'
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
    phoneNumber: new FormControl(null),
    branch: new FormControl(null),
  });

  constructor(private _store: Store, private _router: Router) {
    this.loading$ = this._store.select(BnCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new BnCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

    this._store.select(BnCardState.getBnCards).subscribe((cards: BnCardItemModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<BnCardItemModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(BnCardState.getBnCardQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public checkedChanged(
    event: MatCheckboxChange,
    element: BnCardItemModel
  ): void {
    element.select = event.checked;
  }

  public rowClicked(element: BnCardItemModel): void {
    this._store.dispatch(new BnCardActions.SetBnCard(element));
    this._router.navigate(['banks/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new BnCardActions.List({ size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }

  public clearFilters(): void {
    if (!this.bankFilterForm?.value?.definition && !this.bankFilterForm?.value?.phoneNumber && !this.bankFilterForm?.value?.branch ) {
      return;
    }

    this.bankFilterForm.reset();
    const queryParams = this._store.selectSnapshot(BnCardState.getBnCardQueryParams);
    this._store.dispatch(
      new BnCardActions.List({ size: queryParams.size, page: queryParams.page, filter: {} })
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
          field: 'definition',
          value: this.bankFilterForm.value.definition,
          operator: 'contains',
        }
      };

      if (this.bankFilterForm.value.phoneNumber) {
        filter = {
          filter: {
            field: 'definition',
            value: this.bankFilterForm.value.definition,
            operator: 'contains',
            logic: "and",
            filters: [{
              field: 'telnrs1',
              value: this.bankFilterForm.value.phoneNumber,
              operator: 'eq',
            }]
          }
        };

        if (this.bankFilterForm.value.branch) {
          filter = {
            filter: {
              field: 'definition',
              value: this.bankFilterForm.value.definition,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'telnrs1',
                value: this.bankFilterForm.value.phoneNumber,
                operator: 'eq',
              },
              {
                field: "branch",
                value: this.bankFilterForm.value.branch,
                operator: 'contains'
              }
              ]
            }
          };
        }
      } else {
        if (this.bankFilterForm.value.branch) {
          filter = {
            filter: {
              field: 'definition',
              value: this.bankFilterForm.value.definition,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'branch',
                value: this.bankFilterForm.value.branch,
                operator: 'contains',
              }]
            }
          };
        }
      }

    } else {
      if (this.bankFilterForm.value.branch) {
        filter = {
          filter: {
            field: 'branch',
            value: this.bankFilterForm.value.branch,
            operator: 'contains',
          }
        };

        if (this.bankFilterForm.value.phoneNumber) {
          filter = {
            filter: {
              field: 'branch',
              value: this.bankFilterForm.value.branch,
              operator: 'contains',
              logic: "and",
              filters: [{
                field: 'telnrs1',
                value: this.bankFilterForm.value.phoneNumber,
                operator: 'eq',
              }]
            }
          };
        }
      } else {
        if (this.bankFilterForm.value.phoneNumber) {
          filter = {
            filter: {
              field: 'telnrs1',
              value: this.bankFilterForm.value.phoneNumber,
              operator: 'eq',
            }
          };
        }
      }
    }

    if (!filter) {
      return;
    }

    const queryParams = this._store.selectSnapshot(BnCardState.getBnCardQueryParams);
    this._store.dispatch(
      new BnCardActions.List({ size: queryParams.size, page: queryParams.page, filter })
    );
  }
}
