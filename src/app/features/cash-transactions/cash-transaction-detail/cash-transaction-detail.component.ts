import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerComponent } from '../../../components/banner/banner.component';
import { ActivatedRoute, Params } from '@angular/router';
import { SubSink } from 'subsink';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CashTransactionDetailListComponent } from '../cash-transaction-detail-list/cash-transaction-detail-list.component';
@Component({
  selector: 'app-cash-transaction-detail',
  imports: [
    BannerComponent,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CashTransactionDetailListComponent,
  ],
  templateUrl: './cash-transaction-detail.component.html',
  styleUrl: './cash-transaction-detail.component.scss',
})
export class CashTransactionDetailComponent implements OnInit, OnDestroy {
  public cashName: string = '';
  public cashFilterForm!: FormGroup;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      const cashId = params['id'];

      // TODO: istek atılıp name setlenmeli
      this.cashName = `Idsi ${cashId} olan kasa ismi`;
    });

    this._buildForm();
  }

  public filter(): void {}

  private _buildForm(): void {
    this.cashFilterForm = new FormGroup({
      name: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl('', [Validators.email]),
    });
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
