import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  tickersURL="http://localhost:3000/getTickers/"

  getPrices():Observable<any>{
    return this.http.get(this.tickersURL);
  }
}
