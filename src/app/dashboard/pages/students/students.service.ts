import { Injectable } from '@angular/core';
import { Student } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

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
