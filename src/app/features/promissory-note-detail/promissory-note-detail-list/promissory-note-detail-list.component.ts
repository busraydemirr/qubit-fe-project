import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CsCardLineModel } from '../../../models/cscard/cscard-line.model';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CsCardState } from '../../../state/cscard/cscard.state';
import { CsCardActions } from '../../../state/cscard/cscard.action';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-promissory-note-detail-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    DatePipe
  ],
  templateUrl: './promissory-note-detail-list.component.html',
  styleUrl: './promissory-note-detail-list.component.scss'
})
export class PromissoryNoteDetailListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() csCardId!: number;

  public elements: CsCardLineModel[] = [];
  public dataSource!: MatTableDataSource<CsCardLineModel>;
  public displayedColumns = [
    'clCardDefinition',
    'date',
    'devir',
    'statno',
    'status'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public term!: string;
  private _subSink = new SubSink();

  constructor(private _route: ActivatedRoute, private _store: Store) {
    this.loading$ = this._store.select(CsCardState.getLinesListLoading);
  }

  public ngOnInit(): void {
    this._subSink.sink = this._route.url.subscribe((urls: UrlSegment[]) => {
      this.term = urls[0].toString().includes('customer') ?
        this._store.selectSnapshot(CsCardState.getCekTerm) : this._store.selectSnapshot(CsCardState.getPimakTerm);
    });

    const payload = {
      id: this.csCardId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {},
      term: this.term
    };
    this._store.dispatch(new CsCardActions.GetCsCardLines(payload));

    this._store.select(CsCardState.getCsCardLines).subscribe((cscard: CsCardLineModel[]) => {
      this.elements = cscard;
      this.dataSource = new MatTableDataSource<CsCardLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(CsCardState.getCsCardLineQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new CsCardActions.GetCsCardLines
        ({ id: this.csCardId, size: event.pageSize, page: event.pageIndex, filter: {}, term: this.term })
    );
  }
}
