import { Component, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-transaction-detail-list',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './cash-transaction-detail-list.component.html',
  styleUrl: './cash-transaction-detail-list.component.scss',
})
export class CashTransactionDetailListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public elements: CashDetailElement[] = [
    {
      id: 1,
      code: 'SSDDK',
      name: ' Cari 1',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 2,
      code: 'SSDDK',
      name: ' Cari 2',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 3,
      code: 'SSDDK',
      name: ' Cari 3',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 4,
      code: 'SSDDK',
      name: ' Cari 4',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 5,
      code: 'SSDDK',
      name: ' Cari 5',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 6,
      code: 'SSDDK',
      name: ' Cari 6',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 7,
      code: 'SSDDK',
      name: ' Cari 7',
      description: 'TL',
      remainder: 82719,
      idRemainder: 1090,
    },
    {
      id: 8,
      code: 'SSDDK',
      name: ' Cari 8',
      description: 'USD',
      remainder: 82719,
      idRemainder: 1090,
    },
  ];
  public dataSource = new MatTableDataSource<CashDetailElement>(this.elements);
  public displayedColumns = [
    'code',
    'name',
    'description',
    'remainder',
    'idRemainder',
  ];

  constructor(private _router: Router) {}

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rowClicked(element: CashDetailElement): void {
    this._router.navigate(['current-accounts/detail', element.id]);
  }
}

export interface CashDetailElement {
  id: number;
  code: string;
  name: string;
  description: string;
  remainder: number;
  idRemainder: number;
}
