import { Pipe, PipeTransform } from '@angular/core';
interface Currency {
  last: any;
  volume: any;
  base_unit: any;
  change: any;
  colors: any;
  name:any;
}

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
  Currencies:any;

  transform(items: Array<any>, category: string): Array<any> {
    console.log(items.filter(item => item.quote_unit === category))
    return items.filter(item => item.quote_unit === category);
}
  }

