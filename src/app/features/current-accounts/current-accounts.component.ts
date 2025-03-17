import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../state/clcard/clcard.action';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClCardItemModel } from '../../models/clcard/clcard.model';
import { ClCardState } from '../../state/clcard/clcard.state';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

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
  ],
  templateUrl: './current-accounts.component.html',
  styleUrl: './current-accounts.component.scss',
})
export class CurrentAccountsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: ClCardItemModel[] = [];
  public dataSource!: MatTableDataSource<ClCardItemModel>;
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
    this.loading$ = this._store.select(ClCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new ClCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );
    // this._store.dispatch(
    //   new BnCardActions.List({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    // );

    this._store.select(ClCardState.getClCards).subscribe((cards: ClCardItemModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<ClCardItemModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(ClCardState.getClCardQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this._store.dispatch(
      new ClCardActions.List({ size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}