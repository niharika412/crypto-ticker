import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  constructor(private cryptoService:CryptoService) { }

  ngOnInit(): void {
    this.getCurrencies();
  }
  currencies:any;
  error:any;

  getCurrencies(){
    this.cryptoService.getPrices().subscribe((success:any)=>this.currencies=success,(error:any)=>this.error=error);
  }
}
