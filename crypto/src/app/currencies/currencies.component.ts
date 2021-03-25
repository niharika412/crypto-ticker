import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoService } from '../crypto.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit{

  constructor(private cryptoService: CryptoService) { }
  @ViewChild(MatPaginator) paginator: any;


  ngOnInit(): void {
    this.getCurrencies();  
  }
  page=2;
  currencies:any;
  currencyArray=<any>[];
  error: any;
  pageSize=10;

  getCurrencies() {
    this.cryptoService.getPrices().subscribe((success: any) => {
      // console.log(success)
      this.currencies = success;
      for (const property in this.currencies) {
        this.currencyArray.push(this.currencies[property]);
      }
      // console.log(this.currencyArray)
    }
    ,(error: any) => this.error = error);
  }


}

