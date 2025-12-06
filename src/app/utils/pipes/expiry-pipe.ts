import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiry'
})
export class ExpiryPipe implements PipeTransform {
  transform(value: Date | string | number, fullYear: boolean = false): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = fullYear
      ? date.getFullYear().toString()
      : date.getFullYear().toString().slice(-2);

    return `${month}/${year}`;
  }
}
