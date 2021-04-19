import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurdetailsService {

  constructor(private http:HttpClient) { }

  getMetaData(name:string):Observable<any>{
                                                                                                              //add your key
    return this.http.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol='+ name+'&market=CNY&apikey=')
  }


  getOrders(name:string):Observable<any>{
    return this.http.get('http://localhost:3000/ordersHistory/'+ name.toLowerCase()+ 'usdt');
  }

  getMarketHistory(name:string):Observable<any>{
    return this.http.get('http://localhost:3000/marketHistory/'+  name.toLowerCase()+ 'usdt')
  }
}
