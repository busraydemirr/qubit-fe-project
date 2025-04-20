import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CsCardModel } from '../../models/cscard/cscard.model';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QueryParams } from '../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Store } from '@ngxs/store';
import { CsCardState } from '../../state/cscard/cscard.state';
import { CsCardActions } from '../../state/cscard/cscard.action';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-pimak-promissory-notes',
  imports: [
    MatTableModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
    NgxSkeletonLoaderModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './pimak-promissory-notes.component.html',
  styleUrl: './pimak-promissory-notes.component.scss'
})
export class PimakPromissoryNotesComponent implements OnInit, AfterViewInit, OnDestroy {
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

  constructor(private _router: Router, private _store: Store) {
    this.loading$ = this._store.select(CsCardState.getLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new CsCardActions.CsCardPimakList({ size: this.queryParams.size, page: this.queryParams.page, filter: {} })
    );

    this.subsink.sink = this._store.select(CsCardState.getPimakList).subscribe((csCard: CsCardModel[]) => {
      this.elements = csCard;
      this.dataSource = new MatTableDataSource<CsCardModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(CsCardState.getpimakQueryParams);
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
    this._router.navigate(['pimak-promissory-notes/detail', element.id]);
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new CsCardActions.CsCardPimakList({ size: event.pageSize, page: event.pageIndex, filter: {}, term: this.termControl.value! })
    );
  }
}
