import { Injectable } from '@angular/core';
import { Student } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable <Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseUrl}/students`);
  }

  createStudent(payload: Student): Observable<Student[]> {
    return this.httpClient.post<Student[]>(`${environment.baseUrl}/students`, payload).pipe(concatMap(() => 
    this.getStudents()
  ))
  }

  updateStudent(studentId: number, payload: Student): Observable<Student[]> {
    return this.httpClient.put<Student>(`${environment.baseUrl}/students/${studentId}`, payload).pipe(concatMap(() => 
      this.getStudents()
    ))
  }

  deleteStudent(studentId: number): Observable<Student[]> {
    return this.httpClient.delete<Student>(`${environment.baseUrl}/students/${studentId}`).pipe(concatMap(() => this.getStudents()
    ));
  }

  getStudentById$(studentId: number): Observable<Student | undefined> {
    return this.httpClient.get<Student>(`${environment.baseUrl}/students/${studentId}`)
  }
}
