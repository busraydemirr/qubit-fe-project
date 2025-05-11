import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { OrficheModel } from '../../../models/orfiche/orfiche.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../../models/shared/query-params.model';
import { SubSink } from 'subsink';
import { renderCurrency } from '../../../utils/enum.utils';
import { OrficheService } from '../../../services/orfiche.service';
import { AsyncPipe, CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OrficheActions } from '../../../state/orfiche/orfiche.action';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-accounts-detail-orfiches',
  imports: [
    MatTableModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
    NgxSkeletonLoaderModule,
    NgIf,
    AsyncPipe,
    DatePipe,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './current-accounts-detail-orfiches.component.html',
  styleUrl: './current-accounts-detail-orfiches.component.scss'
})
export class CurrentAccountsDetailOrfichesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() cardId!: number;
  public elements: OrficheModel[] = [];
  public dataSource!: MatTableDataSource<OrficheModel>;
  public displayedColumns = [
    'ficheno',
    'clientref',
    'clCardDefinition',
    'trcurr',
    'totalAmountPrice',
    'allShippedAmountPrice',
    'amountOfRemainingPrice',
    'date',
    'nettotal',
    'genexp1',
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading!: boolean;
  public renderCurrency = renderCurrency;
  public subsink = new SubSink();

  constructor(private _orficheService: OrficheService, private _store: Store, private _router: Router) { }

  public ngOnInit(): void {
    const filter = {
      filter: {
        field: 'clientref',
        value: this.cardId?.toString(),
        operator: 'eq'
      }
    };
    this.loading = true;
    this.subsink.sink = this._orficheService.listOrfiches(10, 0, filter, '03').subscribe(orficheList => {
      this.loading = false;
      this.elements = orficheList.data.items;
      this.dataSource = new MatTableDataSource<OrficheModel>(this.elements);
      this.queryParams = {
        totalElements: orficheList.data.count,
        size: orficheList.data.size,
        page: orficheList.data.index,
        pages: orficheList.data.pages
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  public ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public rowClicked(element: OrficheModel): void {
    this._store.dispatch(new OrficheActions.SetOrfiche(element));
    this._router.navigate(['received-orfiches/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    const filter = {
      filter: {
        field: 'clientref',
        value: this.cardId?.toString(),
        operator: 'eq'
      }
    };
    this.loading = true;
    this.subsink.sink = this._orficheService.listOrfiches(event.pageSize, event.pageIndex, filter, '03').subscribe(orficheList => {
      this.loading = false;
      this.elements = orficheList.data.items;
      this.dataSource = new MatTableDataSource<OrficheModel>(this.elements);
      this.queryParams = {
        totalElements: orficheList.data.count,
        size: orficheList.data.size,
        page: orficheList.data.index,
        pages: orficheList.data.pages
      }
    });
  }
}
