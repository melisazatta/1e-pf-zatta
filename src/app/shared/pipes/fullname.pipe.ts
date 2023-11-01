import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): unknown {
    // console.log('value', value);
    
    //`${value.name} ${value.lastname}`
    return value.name + ' ' + value.lastname;
  }

}
