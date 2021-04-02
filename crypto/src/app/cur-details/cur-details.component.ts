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
    this.orders =this.getOrders();
    this.history=this.getMarketHistory();
    setInterval(() => {
      this.orders=[]
      this.orders=this.getOrders();
      this.history=[]
      this.history=this.getMarketHistory();
      // console.log(this.currencyArray)
    }, 10 * 1000);
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
  history:any;
  errMsg:any;

  getMeta(){
    this.curDetService.getMetaData(this.name).subscribe((success:any)=>
    {
      this.data=success;
      this.metadata=this.data['Meta Data'];
      this.today = new Date();
      this.latestDate =this.datepipe.transform(this.today, 'yyyy-MM-dd');
      this.todayDetails= this.data['Time Series (Digital Currency Daily)'][this.latestDate];
  },(error:any)=>this.errorMessage=error);
  }

  getOrders(){
    this.curDetService.getOrders(this.name).subscribe((success:any)=>{
      this.orders=success;
      return this.orders;
    },(error:any)=>this.errorMsg=error);
  }

  getMarketHistory(){
    this.curDetService.getMarketHistory(this.name).subscribe((success:any)=>{ this.history=success;return this.history},(error:any)=>this.errMsg=error);
  }
}
