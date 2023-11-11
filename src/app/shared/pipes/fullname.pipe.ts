import { Pipe, PipeTransform } from '@angular/core';
// import { Student } from 'src/app/dashboard/pages/students/models';
// import { User } from 'src/app/dashboard/pages/users/models';
interface Person {
  name: string;
  lastName: string;
}

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: Person, ...args: unknown[]): unknown {

    if (value && typeof value.name === 'string' && typeof value.lastName === 'string') {
      return `${value.name} ${value.lastName}`;
    } else {
      return '';
    }
    // return value.name + ' ' + value.lastName;
  }

}
