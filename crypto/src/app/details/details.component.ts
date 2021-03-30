import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  name:any;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: "bar",
        data: [1, 2, 3]
      }
    ]
  };
}