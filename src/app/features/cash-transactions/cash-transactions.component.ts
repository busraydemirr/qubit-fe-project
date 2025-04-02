import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
    AsyncPipe
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
    'select',
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
}