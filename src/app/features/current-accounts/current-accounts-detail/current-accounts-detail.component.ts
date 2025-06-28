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
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClCardItemModel } from '../../../models/clcard/clcard.model';
import { ClCardState } from '../../../state/clcard/clcard.state';
import { AsyncPipe, NgIf } from '@angular/common';
import { ClCardActions } from '../../../state/clcard/clcard.action';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { renderClCardType, renderRectStatus, renderStatus } from '../../../utils/enum.utils';
import { CurrentAccountsDetailOrfichesComponent } from '../current-accounts-detail-orfiches/current-accounts-detail-orfiches.component';

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
    AsyncPipe,
    NgIf,
    MatProgressSpinnerModule,
    CurrentAccountsDetailOrfichesComponent,
  ],
  templateUrl: './current-accounts-detail.component.html',
  styleUrl: './current-accounts-detail.component.scss',
})
export class CurrentAccountsDetailComponent implements OnInit, OnDestroy {
  public accountId!: number;
  public clCard$!: Observable<ClCardItemModel | undefined>;
  public loading$!: Observable<boolean>;
  public renderRecStatus = renderRectStatus;
  public renderStatus = renderStatus;
  public renderClCardType = renderClCardType;
  private _subSink: SubSink = new SubSink();

  constructor(private route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    // START
    // ESONMEZ
    // Bug : Cari Detay Sayfası, Farklı Carilere Geçişte Veriyi Güncellemiyor
    //Fix : Component yeniden kullanıldığında eski verinin gösterilmesi hatası, veri getirme komutu route.params.subscribe içine taşıyarak URL her değiştiğinde tetiklenmesi sağlanarak düzeltildi.
    // Store'dan gelen veriyi ve loading durumunu dinlemeye başla
    this.clCard$ = this._store.select(ClCardState.getClCardDetail);
    this.loading$ = this._store.select(ClCardState.getDetailLoading);

    // URL'deki parametreleri dinle
    this._subSink.sink = this.route.params.subscribe((params: Params) => {
      // 1. Yeni ID'yi al
      this.accountId = +params['id']; // '+' ile number tipine çevir

      // 2. Store'daki mevcut kartın anlık görüntüsünü al
      const currentCardInStore = this._store.selectSnapshot(ClCardState.getClCardDetail);

      // 3. Eğer store'da kart yoksa VEYA store'daki kartın ID'si yeni gelen ID'den farklıysa,
      //    yeni veriyi getirmek için action'ı dispatch et.
      if (!currentCardInStore || currentCardInStore.id !== this.accountId) {
        this._store.dispatch(new ClCardActions.GetClCard(this.accountId));
      }
    });
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
