import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../../models/invoices/invoice.model';
import { SubSink } from 'subsink';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { InvoiceState } from '../../state/invoice/invoice.state';
import { InvoiceActions } from '../../state/invoice/invoice.action';
import { InvoiceDetailListComponent } from './invoice-detail-list/invoice-detail-list.component';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { BannerComponent } from '../../components/banner/banner.component';
import { renderAccountedInfo } from '../../utils/enum.utils';
import { InvoiceDetailClcardComponent } from './invoice-detail-clcard/invoice-detail-clcard.component';

@Component({
  selector: 'app-invoice-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    InvoiceDetailListComponent,
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule,
    CommonModule,
    InvoiceDetailClcardComponent
  ],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  public invoiceId!: number;
  public invoice$!: Observable<InvoiceModel>;
  public loading$!: Observable<boolean>;
  public renderAccountedInfo = renderAccountedInfo;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      this.invoiceId = params['id'];
    });

    this.invoice$ = this._store.select(InvoiceState.getInvoiceDetail);
    this.loading$ = this._store.select(InvoiceState.getDetailLoading);

    const invoice: InvoiceModel | undefined = this._store.selectSnapshot(InvoiceState.getInvoiceDetail);

    if (!invoice || !invoice.id) {
      this._store.dispatch(new InvoiceActions.GetInvoice(this.invoiceId!));
    }
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
