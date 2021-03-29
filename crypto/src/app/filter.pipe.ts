import { Pipe, PipeTransform } from '@angular/core';
interface Currency {
  last: any;
  volume: any;
  base_unit: any;
  change: any;
  colors: any;
  name:any;
  quote_unit:any;
}

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  Currencies:any;

  transform(items: Currency[], category: string): Array<any> {

    return items.filter(item => item.quote_unit === category);
}
  }

