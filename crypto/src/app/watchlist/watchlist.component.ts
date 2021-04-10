import { Component, OnInit } from '@angular/core';
import { WatchlistService } from './watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(private wsService:WatchlistService) { }

  ngOnInit(): void {
    this.getWatchList();
  }
  userId:any;
  watchlist:any;
  errorMsg:any;
  success:any;
  err:any;

  getWatchList(){
    this.userId=sessionStorage.getItem('userId');
    this.wsService.getWatchList(this.userId).subscribe((success:any)=>this.watchlist=success[0].items,(error:any)=>this.errorMsg=error.message)
  }

  deleteFromWatchList(item:string){
    this.watchlist = this.watchlist.filter((items:any)=>items!=item)
    this.wsService.deleteWatch(this.userId,item).subscribe((success:any)=>this.success=success,(error)=>this.err=error.message)
  }

}
