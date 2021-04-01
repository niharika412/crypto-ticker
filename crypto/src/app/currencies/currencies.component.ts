import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { MatPaginator } from '@angular/material/paginator';
import { range } from 'rxjs';

interface Currency {
  last: any;
  volume: any;
  base_unit: any;
  change: any;
  colors: any;
  name:any;
  quote_unit:any;
}

@Component({
  selector: 'currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  constructor(private cryptoService: CryptoService) { }
  @ViewChild(MatPaginator) paginator: any;

  
  test: any;
  ngOnInit(): void {
    this.currencyArray = this.getCurrencies();    
    // console.log(this.change)
    setInterval(() => {
      this.previous = [...this.change];
      this.currencyArray.splice(0)
      this.currencyArray =  this.getCurrencies();
      // console.log(this.currencyArray)
    }, 10 * 1000);
  }

  previous: any;
  page = 2;
  change: any = []
  colors: any = []
  red: boolean = false;
  green: boolean = false;
  currency = []
  currencies: any;
  currencyArray:Currency[]= [];
  error: any;
  pageSize = 10;
  pChange:any;
  diff:any;

  

  getCurrencies(): any {
    this.cryptoService.getPrices().subscribe((success: any) => {
      // console.log(success)
      this.currencies = success;
      for (let propert in this.currencies) {
        this.currencyArray.push(this.currencies[propert]);
      }
      this.pChange=[...this.change]
      this.change=[]
      for (let e of this.currencyArray){
        this.change.push(e.last)
      }
      for(let i=0;i<this.currencyArray.length;i++){
        this.currencyArray[i].change=(this.change[i]-this.pChange[i]);
        if((this.change[i]-this.pChange[i])>=0){
          this.currencyArray[i].colors='green'
        }
        else{
          this.currencyArray[i].colors='red'
        }
      }
    }
      , (error: any) => this.error = error);
    if (!this.error) {
      return this.currencyArray;
    }
    else {
      return null
    }
  }




}

