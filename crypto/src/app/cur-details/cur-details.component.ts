import { Component, Input, OnInit } from '@angular/core';
import { CurdetailsService } from './curdetails.service';
import { DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { WatchlistService } from '../watchlist/watchlist.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'cur-details',
  templateUrl: './cur-details.component.html',
  styleUrls: ['./cur-details.component.css'],
  providers:[DatePipe]
})
export class CurDetailsComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar,private curDetService:CurdetailsService,public datepipe:DatePipe, private wsService:WatchlistService) { }

  ngOnInit(): void {
  
    if(sessionStorage.getItem("loggedIn")=="true"){
      this.logged=true;
    }
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
  logged:boolean=false;
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
  notAv:boolean=false;

  getMeta(){
    this.curDetService.getMetaData(this.name).subscribe((success:any)=>
    {
      this.data=success;
      this.metadata=this.data['Meta Data'];
      this.today = new Date();
      this.latestDate =this.datepipe.transform(this.today, 'yyyy-MM-dd');
      this.todayDetails= this.data['Time Series (Digital Currency Daily)'][this.latestDate];
  },(error:any)=>{this.errorMessage=error;this.notAv=true});
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

  userId:any;

  addToWatchList(item:any){
    this.userId = sessionStorage.getItem('userId');
    this.wsService.addToWatch(this.userId,item).subscribe((success:any)=>{
      this._snackBar.open("Added to Wishlist", "", {
        duration: 2000,
      });
    },(error:any)=>{
      this._snackBar.open("Some error occured", "", {
        duration: 2000,
      });
    })

  }
}
