import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { QueryParams } from '../../../models/shared/query-params.model';
import { Observable } from 'rxjs';
import { BnCardState } from '../../../state/bncard/bncard.state';
import { Store } from '@ngxs/store';
import { BnCardActions } from '../../../state/bncard/bncard.action';
import { BnCardAccountModel } from '../../../models/bncard/bncard-account.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardType } from '../../../models/bncard/card-type.enum';
import { Currency } from '../../../models/bncard/currency.enum';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialog } from '@angular/material/dialog';
import { BankAccountTransactionsDialogComponent } from '../bank-account-transactions-dialog/bank-account-transactions-dialog.component';

@Component({
  selector: 'app-bank-accounts',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    AsyncPipe,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})
export class BankAccountsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() bankId!: number;

  public elements: BnCardAccountModel[] = [];
  public dataSource!: MatTableDataSource<BnCardAccountModel>;
  public displayedColumns = [
    'code',
    'cardtype',
    'definition',
    'currency',
    'iban'
  ];
  public queryParams: QueryParams = {
    size: 10,
    page: 0,
    totalElements: 0,
    pages: 0
  };
  public loading$: Observable<boolean>;
  public cardType = CardType;
  private _dialog = inject(MatDialog);

  constructor(private _store: Store) {
    this.loading$ = this._store.select(BnCardState.getAccountListLoading);
  }

  public ngOnInit(): void {
    const payload = {
      id: this.bankId,
      size: this.queryParams.size,
      page: this.queryParams.page,
      filter: {}
    };
    this._store.dispatch(new BnCardActions.GetBnCardAccounts(payload));

    this._store.select(BnCardState.getBnCardAccounts).subscribe((cards: BnCardAccountModel[]) => {
      this.elements = cards;
      this.dataSource = new MatTableDataSource<BnCardAccountModel>(this.elements);
      this.queryParams = this._store.selectSnapshot(BnCardState.getBnCardAccountsQueryParams);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public changePaginationEvents(event: PageEvent): void {
    this._store.dispatch(
      new BnCardActions.GetBnCardAccounts({ id: this.bankId, size: event.pageSize, page: event.pageIndex, filter: {} })
    );
  }

  public openBankAccountLines(element: BnCardAccountModel): void {
    const dialogRef = this._dialog.open(BankAccountTransactionsDialogComponent, {
      data: { element },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //  this.animal.set(result);
      // }
    });
  }

  public renderCardType(cardType: number): CardType | '' {
    switch (cardType) {
      case 1: return CardType.BankaHesabı;
      case 2: return CardType.KrediKartı;
      case 3: return CardType.SanalPos;
      default: return '';
    }
  }

  public renderCurrency(currency: number): Currency | '' {
    switch (currency) {
      case 0: return Currency.TRY;
      case 1: return Currency.USD;
      case 20: return Currency.EUR;
      case 30: return Currency.GBP;
      case 40: return Currency.JPY;
      default: return '';
    }
  }
}
