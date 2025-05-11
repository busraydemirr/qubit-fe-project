import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { OrficheLineModel } from '../../../models/orfiche/orfiche-line.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngxs/store';
import { OrficheState } from '../../../state/orfiche/orfiche.state';
import { OrficheActions } from '../../../state/orfiche/orfiche.action';
import { AsyncPipe, CommonModule, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { renderCurrency, renderOrficheStatus } from '../../../utils/enum.utils';

@Component({
  selector: 'app-orfiche-detail-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    DatePipe,
    CommonModule
  ],
  templateUrl: './orfiche-detail-list.component.html',
  styleUrl: './orfiche-detail-list.component.scss'
})
export class OrficheDetailListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() orficheId!: number;

  public elements: OrficheLineModel[] = [];
  public dataSource!: MatTableDataSource<OrficheLineModel>;
  public displayedColumns = [
    'id',
    'itemCode',
    'itemName',
    'clCardDefinition',
    'stockref',
    'ordficheref',
    'date',
    'amount',
    'price',
    'total',
    'unitAmountPrice',
    'allShippedAmountPrice',
    'allAmountPrice',
    'amountOfRemainingPrice',
    'shippedamount',
    'discper',
    'vat',
    'vatamnt',
    'vatmatrah',
    'lineexp',
    'uomref',
    /*  'uinfo1',
     'uinfo2',
     'uinfo3',
     'uinfo4',
     'uinfo5',
     'uinfo6',
     'uinfo7',
     'uinfo8', */
    'duedate',
    'linenet',
    'salesmanref',
    'status',
    /*  'grossuinfo1',
     'grossuinfo2', */
    'cancelled',
    'trcurr',
    'orgduedate',
    'orgamount',
    'orgprice'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public term!: string;
  public renderOrficheStatus = renderOrficheStatus;
  public renderCurrency = renderCurrency;
  private _subSink = new SubSink();

  constructor(private _route: ActivatedRoute, private _store: Store, private _router: Router) {
    this.loading$ = this._store.select(OrficheState.getLinesListLoading);
  }

  public ngOnInit(): void {
    this._subSink.sink = this._route.url.subscribe((urls: UrlSegment[]) => {
      this.term = urls[0].toString().includes('received') ?
        this._store.selectSnapshot(OrficheState.getReceivedOrficheTerm) : this._store.selectSnapshot(OrficheState.getPlacedOrficheTerm);
    });

    const payload = {
      id: this.orficheId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {},
      term: this.term
    };
    this._store.dispatch(new OrficheActions.GetOrficheLines(payload));

    this._store.select(OrficheState.getorficheLines).subscribe((orfiche: OrficheLineModel[]) => {
      this.elements = orfiche;
      this.dataSource = new MatTableDataSource<OrficheLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(OrficheState.getorficheLineQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new OrficheActions.GetOrficheLines
        ({ id: this.orficheId, size: event.pageSize, page: event.pageIndex, filter: {}, term: this.term })
    );
  }

  public rowClicked(element: OrficheLineModel): void {
    /*   this._store.dispatch(new BnCardActions.SetBnCard(element)); */
    this._router.navigate(['current-accounts/detail', element.clientref]);
  }


  public ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
