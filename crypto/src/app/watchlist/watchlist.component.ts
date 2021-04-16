import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { CurdetailsService } from '../cur-details/curdetails.service';
import { WatchlistService } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(private wsService: WatchlistService, private crService: CryptoService) { }

  ngOnInit(): void {
    this.getWatchList();

  }
  userId: any;
  watchlist: any;
  errorMsg: any;
  success: any;
  err: any;
  prices: any;
  watch:any=[];
  tickers: any;

  getWatchList() {
    this.userId = sessionStorage.getItem('userId');
    this.wsService.getWatchList(this.userId).subscribe((success: any) => {
      this.watchlist = success[0].items;
      this.crService.getPrices().subscribe((success: any) => {
        this.tickers = success;

        for (let item in this.watchlist) {
          this.watch[item]={}
          // console.log(this.tickers[(this.watchlist[item]).toLowerCase() + "usdt"].last)
          this.watch[item].name = this.watchlist[item];
          this.watch[item].last= this.tickers[(this.watchlist[item]).toLowerCase() + "usdt"].last
        }
        console.log(this.watch)
      }
        , (error: any) => console.log("Error"));
    }, (error: any) => this.errorMsg = error.message)
  }

  deleteFromWatchList(item: string) {
    this.watchlist = this.watchlist.filter((items: any) => items != item)
    this.wsService.deleteWatch(this.userId, item).subscribe((success: any) => this.success = success, (error) => this.err = error.message)
  }

}
