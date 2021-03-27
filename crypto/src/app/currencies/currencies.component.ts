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
    this.test = 'hi';
    
    // console.log(this.change)
    setInterval(() => {
      this.previous = [...this.change];
      this.currencyArray.splice(0)
      this.currencyArray =  this.getCurrencies();
      // this.colors.splice(0)
      // for(let i=0;i<this.change.length;i++){
      //   this.colors.push(this.change[i]-this.previous[i])
      // }
      // console.log(this.currencyArray)
    }, 10 * 1000);
  }

  previous: any;
  page = 2;
  change: any = []
  colors: any = [{}]
  red: boolean = false;
  green: boolean = false;
  currency = []
  currencies: any;
  currencyArray: Currency[] = [];
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
      // this.diff=[]
      // for(let i=0;i<this.change.length;i++){
      //   this.diff.push(Math.abs(this.change[i]-this.pChange[i]))
      // }
      for(let i=0;i<this.currencyArray.length;i++){
        this.currencyArray[i].change=(this.change[i]-this.pChange[i]);
      }
    }
      , (error: any) => this.error = error);
    if (!this.error) {
      return this.currencyArray
    }
    else {
      return null
    }
  }




}

