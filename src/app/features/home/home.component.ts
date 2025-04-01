import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { WEATHER_STATUS } from '../../models/home/weather-status';
import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf, DatePipe, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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

  public data = {
    labels: [
      'A',
      'B',
      'C'
    ],
    datasets: [{
      label: 'Dataset Example',
      data: [300, 50, 100],
      backgroundColor: [
        '#2e4f6e',
        '#6b7d91',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 20
    }]
  };

  public chart: any = [];
  public chart2: any = [];

  constructor(private _http: HttpClient) {
    // this._http.get('https://newsapi.org/v2/top-headlines?country=tr&apiKey=7274bde8d1db42729872205c0aa58332').subscribe(a => console.log(a));

    //this._http.get('https://api.openweathermap.org/data/3.0/onecall?lat=41.01384&lon=28.94966&exclude=current,minutely,hourly,alerts&appid=154f10b56cd02395f04e691bd8b03a79').subscribe(a => console.log(a));

    //this._http.get('https://api.openweathermap.org/data/2.5/weather?lat=41.01384&lon=28.94966&appid=154f10b56cd02395f04e691bd8b03a79').subscribe(a => console.log(a));

    //this._http.get('https://api.weatherstack.com/current?access_key=12a870ec575be9e015fc90d973022f61&query=41.01384,28.94966').subscribe(a => console.log(a));

    this.test();
  }

  public ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: this.data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 2
      }
    });

    this.chart2 = new Chart('canvas2', {
      type: 'pie',
      data: this.data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 2
      }
    });
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
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

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

    // `weatherData` now contains a simple structure with arrays for datetime and weather data

  }
}
