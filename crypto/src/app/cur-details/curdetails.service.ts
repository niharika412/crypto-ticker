import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurdetailsService {

  constructor(private http:HttpClient) { }

  getMetaData():Observable<any>{
    return this.http.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=0810B66ZW6LV5TTU')
  }


  getOrders():Observable<any>{
    return this.http.get('http://localhost:3000/ordersHistory/btcusdt');
  }
}
