import { Injectable } from '@angular/core';
import { Student } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, map } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { Enrollment } from '../enrollments/models';
import { Course } from '../courses/models';

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

  //
  getStudentByIdWithCourse$(studentId: number): Observable<Student | undefined> {
    return this.httpClient.get<Student>(`${environment.baseUrl}/students/${studentId}`).pipe(
        concatMap((student) => {
            return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?studentId=${studentId}`).pipe(
                map((enrollments) => {
                    const enrolledCourses: Course[] = [];
                    
                    // Itera sobre las inscripciones y hace llamadas adicionales para obtener la información de los estudiantes
                    enrollments.forEach((enrollment) => {
                        this.httpClient.get<Course>(`${environment.baseUrl}/courses/${enrollment.courseId}`).subscribe(
                            (course) => {
                                if (course) {
                                    enrolledCourses.push(course);
                                }
                            }
                        );
                    });

                    // Combina la información del curso con la lista de estudiantes inscritos
                    const studentWithHisCourse: Student = { ...student, enrolledCourses };
                    return studentWithHisCourse;
                })
            );
        })
    );
}
}
