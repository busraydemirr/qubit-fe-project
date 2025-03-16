import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrentAccountsDetailListComponent } from '../current-accounts-detail-list/current-accounts-detail-list.component';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-current-accounts-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CurrentAccountsDetailListComponent,
  ],
  templateUrl: './current-accounts-detail.component.html',
  styleUrl: './current-accounts-detail.component.scss',
})
export class CurrentAccountsDetailComponent implements OnInit, OnDestroy {
  public accountName: string = '';
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      const accountId = params['id'];

      // TODO: istek atılıp name setlenmeli
      this.accountName = `Idsi ${accountId} olan cari ismi`;
    });
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
