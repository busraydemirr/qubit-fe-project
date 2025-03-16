import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClCardActions } from '../../state/clcard/clcard.action';
import { BnCardActions } from '../../state/bncard/bncard.action';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-current-accounts',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './current-accounts.component.html',
  styleUrl: './current-accounts.component.scss',
})
export class CurrentAccountsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public elements: AccountElement[] = [
    {
      id: 1,
      select: false,
      code: 'SSDDK',
      name: ' Account 1',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 2,
      select: false,
      code: 'SSDDK',
      name: ' Account 2',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 3,
      select: false,
      code: 'SSDDK',
      name: ' Account 3',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 4,
      select: false,
      code: 'SSDDK',
      name: ' Account 4',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 5,
      select: false,
      code: 'SSDDK',
      name: ' Account 5',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 6,
      select: false,
      code: 'SSDDK',
      name: ' Account 6',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 7,
      select: false,
      code: 'SSDDK',
      name: ' Account 7',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 8,
      select: false,
      code: 'SSDDK',
      name: ' Account 8',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
  ];
  public dataSource = new MatTableDataSource<AccountElement>(this.elements);
  public displayedColumns = [
    'select',
    'code',
    'name',
    'description',
    'remainder',
    'idRemainder',
  ];

  constructor(private _store: Store, private _router: Router) {}

  public ngOnInit(): void {
    this._store.dispatch(
      new ClCardActions.List({ size: 10, page: 0, filter: {} })
    );
    this._store.dispatch(
      new BnCardActions.List({ size: 10, page: 0, filter: {} })
    );
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public checkedChanged(
    event: MatCheckboxChange,
    element: AccountElement
  ): void {
    element.select = event.checked;
  }

  public rowClicked(element: AccountElement): void {
    this._router.navigate(['current-accounts/detail', element.id]);
  }
}

export interface AccountElement {
  id: number;
  select: boolean;
  code: string;
  name: string;
  description: string;
  remainder: number;
  idRemainder: number;
}
