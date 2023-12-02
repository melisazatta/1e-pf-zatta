import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PieChartService {
  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/enrollments`);
  }
  getCourses(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/courses`);
  }

  getStudents(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/students`);
  }
}

