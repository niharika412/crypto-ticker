import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http:HttpClient) { }

  getHistoricalDataDaily(name:string):Observable<any>{
    console.log(name)
    return this.http.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+name+"&market=CNY&apikey=0810B66ZW6LV5TTU")
  }

  getHistoricalDataMonthly(name:string):Observable<any>{
    console.log(name)
    return this.http.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol="+name+"&market=CNY&apikey=0810B66ZW6LV5TTU")
  }

  getHistoricalDataWeekly(name:string):Observable<any>{
    console.log(name)
    return this.http.get("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol="+name+"&market=CNY&apikey=0810B66ZW6LV5TTU")
  }
}
