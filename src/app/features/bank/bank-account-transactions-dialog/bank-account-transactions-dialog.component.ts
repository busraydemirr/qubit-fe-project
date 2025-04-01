import { Component, inject, model, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { BnCardAccountModel } from '../../../models/bncard/bncard-account.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BnCardAccountLineModel } from '../../../models/bncard/bncard-account-line.model';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { BnCardState } from '../../../state/bncard/bncard.state';
import { BnCardActions } from '../../../state/bncard/bncard.action';

@Component({
  selector: 'app-bank-account-transactions-dialog',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './bank-account-transactions-dialog.component.html',
  styleUrl: './bank-account-transactions-dialog.component.scss'
})
export class BankAccountTransactionsDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: BnCardAccountLineModel[] = [];
  public dataSource!: MatTableDataSource<BnCardAccountLineModel>;
  public displayedColumns = [
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

  readonly dialogRef = inject(MatDialogRef<BankAccountTransactionsDialogComponent>);
  readonly data = inject<BnCardAccountModel>(MAT_DIALOG_DATA);
  readonly bankAccount = model(this.data);

  public close(): void {
    this.dialogRef.close();
  }

  constructor(private _store: Store, private _router: Router) {
    this.loading$ = this._store.select(BnCardState.getLineLoading);
  }

  public ngOnInit(): void {
    this._store.dispatch(
      new BnCardActions.AccountLineList({
        id: this.data.id,
        size: this.queryParams.size, page: this.queryParams.page, filter: {}
      })
    );

    this._store.select(BnCardState.getAccountLines).subscribe((cards: BnCardAccountLineModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<BnCardAccountLineModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(BnCardState.getAccountLinesQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
