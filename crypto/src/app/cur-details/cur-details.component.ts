import { Component, Input, OnInit } from '@angular/core';
import { CurdetailsService } from './curdetails.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'cur-details',
  templateUrl: './cur-details.component.html',
  styleUrls: ['./cur-details.component.css'],
  providers:[DatePipe]
})
export class CurDetailsComponent implements OnInit {

  constructor(private curDetService:CurdetailsService,public datepipe:DatePipe) { }

  ngOnInit(): void {
    this.getMeta();
    this.getOrders();
  }
  @Input()
  name:any;
  errorMessage:any;
  today:any
  metadata:any;
  latestDate:any;
  todayDetails:any;
  data:any;
  orders:any;
  errorMsg:any;

  getMeta(){
    this.curDetService.getMetaData().subscribe((success:any)=>
    {
      this.data=success;
      this.metadata=this.data['Meta Data'];
      this.today = new Date();
      this.latestDate =this.datepipe.transform(this.today, 'yyyy-MM-dd');
      this.todayDetails= this.data['Time Series (Digital Currency Daily)'][this.latestDate];
  },(error:any)=>this.errorMessage=error);
  }

  getOrders(){
    this.curDetService.getOrders().subscribe((success:any)=>{
      this.orders=success;
      console.log(this.orders)
    },(error:any)=>this.errorMsg=error);
  }

}
