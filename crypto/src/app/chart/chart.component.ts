import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from './chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  data: any;
  errorMsg: any;
  dates: any = []
  values: any = []
  dataPoints: any = []
  volumes: any = []
  updateFlag: boolean = false;
  name = "BTC"
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.chartService.getHistoricalData().subscribe((success: any) => {
      this.data = success;
      this.values = this.data['Time Series (Digital Currency Daily)']
      this.dataPoints = []
      this.dates = []
      this.volumes = []
      for (let i in this.values) {
        this.dates.push(i);
        this.dataPoints.push(this.values[i]['4b. close (USD)']);
        this.volumes.push(this.values[i]['volume'])
      }
      this.dataPoints = this.dataPoints.map(Number);
      this.volumes = this.volumes.map(Number);
      console.log(this.dataPoints)
      this.chartOptions.series = [
        {
          type: 'line',
          name: this.name,
          data: this.dataPoints.slice(0, 31)

        },
        {
          type: 'line',
          name: 'Volumes',
          data: this.volumes.slice(0, 31),
          yAxis: 1
        }
      ]
      this.chartOptions.xAxis = {
        categories: this.dates,
        crosshair: true
      }

      this.updateFlag = true;
      // console.log(this.dataPoints)
    },
      (error: any) => this.errorMsg = error)
  }

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      
    },
    title: {
      text: 'Stock Chart for ' + this.name
    },
    subtitle: {
      text: 'Source: alphavantage.co'
    },
    xAxis: {
      categories: [
      ],
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'Closing Price ($)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      type: 'line',
      name: 'Dates',
      data: []

    }]
  }
}
