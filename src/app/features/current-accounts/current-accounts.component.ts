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
import { ClCardItemModel } from '../../models/clcard/clcard.model';
import { ClCardState } from '../../state/clcard/clcard.state';

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

  public elements: ClCardItemModel[] = [];
  public dataSource!: MatTableDataSource<ClCardItemModel>;
  public displayedColumns = [
    'select',
    'id',
    'code',
    'name',
  ];

  constructor(private _store: Store, private _router: Router) { }

  public ngOnInit(): void {
    this._store.dispatch(
      new ClCardActions.List({ size: 10, page: 0, filter: {} })
    );
    this._store.dispatch(
      new BnCardActions.List({ size: 10, page: 0, filter: {} })
    );

    this._store.select(ClCardState.getClCards).subscribe((cards: ClCardItemModel[]) => {
      console.log(cards);
      this.elements = cards;
      this.dataSource = new MatTableDataSource<ClCardItemModel>(this.elements);
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public checkedChanged(
    event: MatCheckboxChange,
    element: ClCardItemModel
  ): void {
    element.select = event.checked;
  }

  public rowClicked(element: ClCardItemModel): void {
    this._router.navigate(['current-accounts/detail', element.id]);
  }
}