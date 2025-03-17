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
    'select',
    'id',
    'code',
    'name',
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;

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
}
