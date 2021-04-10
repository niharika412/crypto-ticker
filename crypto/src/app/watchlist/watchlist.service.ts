import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http:HttpClient) { }


  getWatchList(userId:number):Observable<any>{
    return this.http.get("http://localhost:3000/watchList/"+ userId);
  }

  addToWatch(userId:number,code:string):Observable<any>{
    return this.http.put("http://localhost:3000/addToWatch/" + userId + "/"+ code,"");
  }

  deleteWatch(userId:number,code:string):Observable<any>{
    return this.http.delete("http://localhost:3000/deleteFromWatch/" + userId +  "/"+ code);
  }
}
