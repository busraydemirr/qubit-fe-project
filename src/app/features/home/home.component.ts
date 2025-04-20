import { Component, Input, OnInit } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WEATHER_STATUS } from '../../models/home/weather-status';
import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TimePeriodEnum } from '../../models/shared/time-period.enum';
import { OrficheService } from '../../services/orfiche.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-home',
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    SlicePipe,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @Input() user: any = 'Büşra Nur Aydemir'; // TODO: User model
  public weatherData =
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
  };
  public url = "https://api.open-meteo.com/v1/forecast";
  public weatherStatus = WEATHER_STATUS;
  public timePeriodOrfiche = TimePeriodEnum.TODAY;
  public timePeriodInvoince = TimePeriodEnum.TODAY;
  public timePeriodEnum = TimePeriodEnum;
  public orficheLoading = false;
  public invoinceLoading = false;
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

  public chart: any = null;
  public chart2: any = null;
  public invoinceInfo: any = null;
  public orficheInfo: any = null;

  constructor(private _orficheService: OrficheService, private _invoiceService: InvoiceService) {
    this.test();
  }

  ngOnInit(): void {
    this.viewOrficheData(this.timePeriodOrfiche);
    this.viewInvoinceData(this.timePeriodInvoince);
  }

  async test() {
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
  }

  public viewOrficheData(data: TimePeriodEnum): void {
    this.timePeriodOrfiche = data;
    this.orficheLoading = true;
    this._orficheService.getTotalOrfiche(this.timePeriodOrfiche).subscribe((res) => {
      this.orficheLoading = false;
      if (res.data) {
        this.orficheInfo = res.data;
        this.orficheData = {
          ...this.orficheData,
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

    this._invoiceService.getTotalInvoice(this.timePeriodInvoince).subscribe((res) => {
      this.invoinceLoading = false;
      if (res.data) {
        this.invoinceInfo = res.data;
        this.invoinceData = {
          ...this.invoinceData,
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
          }
        });
      } else {
        this.chart.data = this.invoinceData;
        this.chart.update();
      }
    });
  }
}
