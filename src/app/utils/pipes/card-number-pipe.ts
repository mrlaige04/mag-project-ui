import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string): unknown {
    return value.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
