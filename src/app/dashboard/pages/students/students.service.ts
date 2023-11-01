import { Injectable } from '@angular/core';
import { Student } from './models';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(): Student[] {
    return [
      {
        id: 1,
        name: 'Monica',
        lastname: 'Geller',
        email: 'mg@mail.com',
      },
      {
        id: 2,
        name: 'Rachel',
        lastname: 'Green',
        email: 'rg@mail.com',
      },
      {
        id: 3,
        name: 'Chandler',
        lastname: 'Bing',
        email: 'cb@mail.com',
      },
      {
        id: 4,
        name: 'Phoebe',
        lastname: 'Buffay',
        email: 'fb@mail.com',
      },
      {
        id: 5,
        name: 'Joey',
        lastname: 'Tribbiani',
        email: 'jt@mail.com',
      },
    ]
  }
}
