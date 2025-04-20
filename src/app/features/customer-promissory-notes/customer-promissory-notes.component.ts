import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CsCardModel } from '../../models/cscard/cscard.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Store } from '@ngxs/store';
import { CsCardState } from '../../state/cscard/cscard.state';
import { CsCardActions } from '../../state/cscard/cscard.action';
import { Router } from '@angular/router';
import { FilterRequestModel } from '../../models/shared/filter-request.model';

@Component({
  selector: 'app-customer-promissory-notes',
  imports: [
    MatTableModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
    NgxSkeletonLoaderModule,
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './customer-promissory-notes.component.html',
  styleUrl: './customer-promissory-notes.component.scss'
})
export class CustomerPromissoryNotesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: CsCardModel[] = [];
  public dataSource!: MatTableDataSource<CsCardModel>;
  public displayedColumns = [
    'bankname',
    'owing',
    'bnAccountNo',
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
  public primossoryFilterForm: FormGroup = new FormGroup({
    bankname: new FormControl(null),
    owing: new FormControl(null),
  });

  constructor(private _router: Router, private _store: Store) {
    this.loading$ = this._store.select(CsCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new CsCardActions.CsCardCekList({ size: this.queryParams.size, page: this.queryParams.page, filter: {}, term: this.termControl.value! })
    );

    this.subsink.sink = this._store.select(CsCardState.getCekItems).subscribe((csCard: CsCardModel[]) => {
      this.elements = csCard;
      this.dataSource = new MatTableDataSource<CsCardModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(CsCardState.getCekQueryParams);
    });

    this.subsink.sink = this.termControl.valueChanges.subscribe((value) => {
      const queryParams = this._store.selectSnapshot(CsCardState.getCekQueryParams);
      const filter = this._store.selectSnapshot(CsCardState.getCekFilter);
      const payload = {
        size: queryParams.size,
        page: 0,
        term: value!,
        filter: filter ?? {},
      };
      this._store.dispatch(new CsCardActions.CsCardCekList(payload));
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public rowClicked(element: CsCardModel): void {
    this._store.dispatch(new CsCardActions.SetCsCard(element));
    this._router.navigate(['customer-promissory-notes/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new CsCardActions.CsCardCekList({ size: event.pageSize, page: event.pageIndex, filter: {}, term: this.termControl.value! })
    );
  }

  public clearFilters(): void {
    if (!this.primossoryFilterForm?.value?.bankname && !this.primossoryFilterForm?.value?.owing) {
      return;
    }

    this.primossoryFilterForm.reset();
    const queryParams = this._store.selectSnapshot(CsCardState.getCekQueryParams);
    this._store.dispatch(
      new CsCardActions.CsCardCekList({ size: queryParams.size, page: 0, filter: {}, term: this.termControl.value! })
    );
  }

  public filter(): void {
    if (!this.primossoryFilterForm?.value || this.primossoryFilterForm.invalid) {
      return;
    }

    let filter: FilterRequestModel | null = null;
    if (this.primossoryFilterForm.value.bankname) {
      filter = {
        filter: {
          field: 'bankname',
          value: this.primossoryFilterForm.value.bankname,
          operator: 'contains',
        }
      };

      if (this.primossoryFilterForm.value.owing) {
        filter = {
          filter: {
            field: 'bankname',
            value: this.primossoryFilterForm.value.bankname,
            operator: 'contains',
            logic: "and",
            filters: [{
              field: 'owing',
              value: this.primossoryFilterForm.value.owing,
              operator: 'contains',
            }]
          }
        };
      }
    } else {
      if (this.primossoryFilterForm.value.owing) {
        filter = {
          filter: {
            field: 'owing',
            value: this.primossoryFilterForm.value.owing,
            operator: 'contains',
          }
        };
      }
    }

    if (!filter) {
      return;
    }
    const queryParams = this._store.selectSnapshot(CsCardState.getCekQueryParams);
    this._store.dispatch(
      new CsCardActions.CsCardCekList({ size: queryParams.size, page: 0, filter, term: this.termControl.value! })
    );
  }
}
