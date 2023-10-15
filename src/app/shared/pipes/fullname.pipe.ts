import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
