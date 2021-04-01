import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cur-details',
  templateUrl: './cur-details.component.html',
  styleUrls: ['./cur-details.component.css']
})
export class CurDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input()
  name:any;

}
