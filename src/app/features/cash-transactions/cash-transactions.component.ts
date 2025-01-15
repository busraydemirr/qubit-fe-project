import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgClass } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-cash-transactions',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    NgClass,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './cash-transactions.component.html',
  styleUrl: './cash-transactions.component.scss',
})
export class CashTransactionsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public elements: CashElement[] = [
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 1',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 2',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 3',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 4',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 5',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 6',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 7',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      select: false,
      code: 'SSDDK',
      name: 'Product 8',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
  ];
  public dataSource = new MatTableDataSource<CashElement>(this.elements);
  public displayedColumns = [
    'select',
    'code',
    'name',
    'description',
    'remainder',
    'idRemainder',
  ];

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public checkedChanged(event: MatCheckboxChange, element: CashElement): void {
    element.select = event.checked;
  }
}

export interface CashElement {
  select: boolean;
  code: string;
  name: string;
  description: string;
  remainder: number;
  idRemainder: number;
}
