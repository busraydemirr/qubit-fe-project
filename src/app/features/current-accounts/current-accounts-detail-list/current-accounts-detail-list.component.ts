import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../../state/clcard/clcard.action';
import { ClCardState } from '../../../state/clcard/clcard.state';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ClCardLineModel } from '../../../models/clcard/clcard-line.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-current-accounts-detail-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './current-accounts-detail-list.component.html',
  styleUrl: './current-accounts-detail-list.component.scss'
})
export class CurrentAccountsDetailListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() cardId!: number;

  public elements: ClCardLineModel[] = [];
  public dataSource!: MatTableDataSource<ClCardLineModel>;
  public displayedColumns = [
    'id',
    'date',
    'lineexp',
    'sign',
    'amount'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;

  constructor(private _store: Store) {
    this.loading$ = this._store.select(ClCardState.getLinesListLoading);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.cardId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {}
    };
    this._store.dispatch(new ClCardActions.GetClCardLines(payload));

    this._store.select(ClCardState.getClCardLines).subscribe((cards: ClCardLineModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<ClCardLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(ClCardState.getClCardLineQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new ClCardActions.GetClCardLines({ id: this.cardId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }
}
