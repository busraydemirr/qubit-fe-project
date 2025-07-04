import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WEATHER_STATUS } from '../../models/home/weather-status';
import { CommonModule, DatePipe, DecimalPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TimePeriodEnum } from '../../models/shared/time-period.enum';
import { OrficheService } from '../../services/orfiche.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvoiceService } from '../../services/invoice.service';
import { CsCardService } from '../../services/cscard.service';
import { FilterRequestModel } from '../../models/shared/filter-request.model';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  providers: [DatePipe, DecimalPipe, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() user: any; // TODO: User model
  /*  public weatherData =
     {
       daily: {
         time: [new Date()],
         temperature2mMax: new Float32Array(),
         temperature2mMin: new Float32Array(),
         weatherCode: new Float32Array(),
       }
     };
   public params = {
     "latitude": 41.0138,
     "longitude": 28.9497,
     "daily": ["temperature_2m_max", "temperature_2m_min", "weather_code"],
     "timezone": "auto"
   }; */
  /* public url = "https://api.open-meteo.com/v1/forecast";
  public weatherStatus = WEATHER_STATUS; */
  public timePeriodOrfiche = TimePeriodEnum.TODAY;
  public timePeriodInvoince = TimePeriodEnum.TODAY;
  public timePeriodPromissory = TimePeriodEnum.TODAY;
  public timePeriodEnum = TimePeriodEnum;
  public orficheLoading = false;
  public invoinceLoading = false;
  public promissoryLoading = false;
  public invoiceMonthlyLoading = false;
  public orficheData = {
    labels: [
      'Alınan Siparişler',
      'Verilen Siparişler',
    ],
    datasets: [{
      label: 'Siparişler',
      data: [],
      backgroundColor: [
        '#2e4f6e',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 20
    }]
  };

  public invoinceData = {
    labels: [
      'Alış Faturaları',
      'Satış Faturaları',
    ],
    datasets: [{
      label: 'Faturalar',
      data: [],
      backgroundColor: [
        '#2e4f6e',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 20
    }]
  };

  public promissoryData = {
    labels: [
      'Müşteri Çekleri',
      'Pimak Çekleri',
    ],
    datasets: [{
      label: 'Çek ve Senetler',
      data: [],
      backgroundColor: [
        '#2e4f6e',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 20
    }]
  };

  private _labels = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  public invoiceMonthlyData = {
    labels: this._labels,
    datasets: [
      {
        label: 'Satış Faturaları',
        data: [],
        borderColor: "#ff6384",
        backgroundColor: "#ff6384",
      },
    ]
  };



  public chart: any = null;
  public chart2: any = null;
  public chart3: any = null;
  public chart4: any = null;
  public invoinceInfo: any = null;
  public orficheInfo: any = null;
  public promissoryInfo: any = null;
  public invoiceMonthlyInfo: any = null;
  private _filter!: FilterRequestModel;
  public subsink = new SubSink();

  constructor(
    private _orficheService: OrficheService,
    private _invoiceService: InvoiceService,
    private _csCardService: CsCardService,
    private _router: Router,
    private _decimalPipe: DecimalPipe
  ) {
    /* this._renderWeatherTemplate(); */
  }

  ngOnInit(): void {
    this.viewOrficheData(this.timePeriodOrfiche);
    this.viewInvoinceData(this.timePeriodInvoince);
    this.viewPromissoryData(this.timePeriodPromissory);
    this.viewInvoinceMonthlyData();
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  /*   async _renderWeatherTemplate() {
      const responses = await fetchWeatherApi(this.url, this.params);
  
      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  
      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];
  
      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
  
      const daily = response.daily()!;
  
      // Note: The order of weather variables in the URL query and the indices below need to match!
      this.weatherData = {
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          temperature2mMax: daily.variables(0)!.valuesArray()!,
          temperature2mMin: daily.variables(1)!.valuesArray()!,
          weatherCode: daily.variables(2)!.valuesArray()!,
        },
      };
    } */

  public viewInvoinceMonthlyData(): void {
    this.invoiceMonthlyLoading = true;
    this.subsink.sink = this._invoiceService.getTotalInvoiceMonthly().subscribe((res) => {
      this.invoiceMonthlyLoading = false;
      if (res.isSuccess) {
        this.invoiceMonthlyInfo = res.isSuccess ? res.data : null;
        this.invoiceMonthlyData = {
          ...this.invoiceMonthlyData,
          labels: res.data.map((item: any) => item.month),
          datasets: [{
            ...this.invoiceMonthlyData.datasets[0],
            data: res.data.map((item: any) => item.total as never)
          }]
        };
      }
      if (!this.chart4) {
        this.chart4 = new Chart('canvas4', {
          type: 'line',
          data: this.invoiceMonthlyData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
          },
        });
      } else {
        this.chart4.data = this.invoiceMonthlyData;
        this.chart4.update();
      }
    });
  }

  public viewOrficheData(data: TimePeriodEnum): void {
    this.timePeriodOrfiche = data;
    this.orficheLoading = true;
    this.subsink.sink = this._orficheService.getTotalOrfiche(this.timePeriodOrfiche).subscribe((res) => {
      this.orficheLoading = false;
      if (res.data) {
        this.orficheInfo = res.data;
        this.orficheData = {
          ...this.orficheData,
          labels: ['Alınan Siparişler: ' + this._decimalPipe.transform(res.data.totalAmountReceivedOrder, '1.0-0'), 'Verilen Siparişler: ' + this._decimalPipe.transform(res.data.totalAmountPlacedOrder, '1.0-0')],
          datasets: [{
            ...this.orficheData.datasets[0],
            data: [res.data.totalAmountReceivedOrder as never, res.data.totalAmountPlacedOrder as never]
          }]
        };
      }
      if (!this.chart2) {
        this.chart2 = new Chart('canvas2', {
          type: 'pie',
          data: this.orficheData,
          options: {
            maintainAspectRatio: false,
            responsive: false,
            aspectRatio: 1,
            onClick: (event, element, chart) => {
              if (element[0].index === 0) {
                // Alınan Siparişler
                this._router.navigate(['received-orfiches'], { queryParams: { timePeriod: this.timePeriodOrfiche } });
              }

              if (element[0].index === 1) {
                // Verilen Siparişler
                this._router.navigate(['placed-orfiches'], { queryParams: { timePeriod: this.timePeriodOrfiche } });
              }
            }
          }
        });
      } else {
        this.chart2.data = this.orficheData;
        this.chart2.update();
      }
    });
  }

  public viewInvoinceData(data: TimePeriodEnum): void {
    this.timePeriodInvoince = data;
    this.invoinceLoading = true;

    this.subsink.sink = this._invoiceService.getTotalInvoice(this.timePeriodInvoince).subscribe((res) => {
      this.invoinceLoading = false;
      if (res.data) {
        this.invoinceInfo = res.data;
        this.invoinceData = {
          ...this.invoinceData,
          labels: ['Alış Faturaları: ' + this._decimalPipe.transform(res.data.totalAmountPurchaseInvoice, '1.0-0'), 'Satış Faturaları: ' + this._decimalPipe.transform(res.data.totalAmountSalesInvoice, '1.0-0')],
          datasets: [{
            ...this.invoinceData.datasets[0],
            data: [res.data.totalAmountPurchaseInvoice as never, res.data.totalAmountSalesInvoice as never]
          }]
        };
      }
      if (!this.chart) {
        this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: this.invoinceData,
          options: {
            maintainAspectRatio: false,
            responsive: false,
            aspectRatio: 1,
            onClick: (event, element, chart) => {
              if (element[0].index === 0) {
                // Alış Faturaları
                this._router.navigate(['purchase-invoices'], { queryParams: { timePeriod: this.timePeriodInvoince } });
              }

              if (element[0].index === 1) {
                // Satış Faturaları
                this._router.navigate(['sales-invoices'], { queryParams: { timePeriod: this.timePeriodInvoince } });
              }
            }
          }
        });
      } else {
        this.chart.data = this.invoinceData;
        this.chart.update();
      }
    });
  }

  public viewPromissoryData(data: TimePeriodEnum): void {
    this.timePeriodPromissory = data;
    this.promissoryLoading = true;

    this.subsink.sink = this._csCardService.getPromissoryNote(this.timePeriodPromissory).subscribe((res) => {
      this.promissoryLoading = false;
      if (res.data) {
        this.promissoryInfo = res.data;
        this.promissoryData = {
          ...this.promissoryData,
          labels: ['Müşteri Çekleri: ' + this._decimalPipe.transform(res.data.totalAmountForCustomer, '1.0-0'), 'Pimak Çekleri: ' + this._decimalPipe.transform(res.data.totalAmountForPimak, '1.0-0')],
          datasets: [{
            ...this.promissoryData.datasets[0],
            data: [res.data.totalAmountForCustomer as never, res.data.totalAmountForPimak as never]
          }]
        };
      }
      if (!this.chart3) {
        this.chart3 = new Chart('canvas3', {
          type: 'doughnut',
          data: this.promissoryData,
          options: {
            maintainAspectRatio: false,
            responsive: false,
            aspectRatio: 1,
            onClick: (event, element, chart) => {
              if (element[0].index === 0) {
                // Müşteri Çekleri
                this._router.navigate(['customer-promissory-notes'], { queryParams: { timePeriod: this.timePeriodPromissory } });
              }

              if (element[0].index === 1) {
                // Pimak Çekleri
                this._router.navigate(['pimak-promissory-notes'], { queryParams: { timePeriod: this.timePeriodPromissory } });
              }
            }
          }
        });
      } else {
        this.chart3.data = this.promissoryData;
        this.chart3.update();
      }
    });
  }
}
