import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { ActivatedRoute, Params } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cash-transaction-detail',
  imports: [BannerComponent],
  templateUrl: './cash-transaction-detail.component.html',
  styleUrl: './cash-transaction-detail.component.scss',
})
export class CashTransactionDetailComponent implements OnInit, OnDestroy {
  public cashName: string = '';
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      const cashId = params['id'];

      // TODO: istek atılıp name setlenmeli 
      this.cashName = `Idsi ${cashId} olan kasa ismi`;
    });
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
