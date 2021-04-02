import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CryptoService } from '../crypto.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  myControl = new FormControl();
  options: string[] = ['BTC', 'ETH', 'DOGE','MANA','NPXS','DASH'];
  filteredOptions!: Observable<any>;
  search:any;
  searchForm:any;
  selected:boolean=false;
  name:any;
  data:any;
  err:any;
  cArr:any;

  ngOnInit() {
    this.searchForm=this.fb.group({
      search:['',Validators.required]
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  searchFor(){
    // console.log(this.searchForm.value.search);
    this.name=(this.searchForm.value.search);
    this.selected=true;
  }

}
