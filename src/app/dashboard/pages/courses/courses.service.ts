import { Injectable } from "@angular/core";
import { Course } from "./models";
import { Observable, concatMap, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.local';
import { Enrollment } from "../enrollments/models";
import { Student } from "../students/models";

@Injectable({ providedIn: 'root'})
export class CoursesService {

    constructor(private httpClient: HttpClient) { }

    getCourses$(): Observable<Course[]>{
        return this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`);

        // return of(this.courses);
    }

    createCourse$(payload: Course): Observable<Course[]> {
        return this.httpClient.post<Course>(`${environment.baseUrl}/courses`, payload).pipe(concatMap(() => this.getCourses$()
        ));

        // this.courses.push(payload);
        // return of([...this.courses]);
    }

    editCourse$(courseId: number, payload: Course): Observable<Course[]> {

        return this.httpClient.put<Course>(`${environment.baseUrl}/courses/${courseId}`, payload).pipe(concatMap(() => this.getCourses$()
        ));
        // return of(this.courses.map((c) => c.id === id ? { ...c, ...payload} : c));
    }

    deleteCourse$(courseId:number): Observable<Course[]> {
        return this.httpClient.delete<Course>(`${environment.baseUrl}/courses/${courseId}`).pipe(concatMap(() => this.getCourses$()
        ));
        // this.courses = this.courses.filter((c) => c.id !== id);
        // return of(this.courses);
    }

    getCourseById$(courseId: number): Observable<Course | undefined> {
        return this.httpClient.get<Course>(`${environment.baseUrl}/courses/${courseId}`)
        // return of(this.courses.find((c) => c.id === id));
    }
    ///

    getCourseByIdWithEnrolledStudents$(courseId: number): Observable<Course | undefined> {
        return this.httpClient.get<Course>(`${environment.baseUrl}/courses/${courseId}`).pipe(
            concatMap((course) => {
                return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?courseId=${courseId}`).pipe(
                    map((enrollments) => {
                        const enrolledStudents: Student[] = [];
                        
                        // Itera sobre las inscripciones y hace llamadas adicionales para obtener la información de los estudiantes
                        enrollments.forEach((enrollment) => {
                            this.httpClient.get<Student>(`${environment.baseUrl}/students/${enrollment.studentId}`).subscribe(
                                (student) => {
                                    if (student) {
                                        enrolledStudents.push(student);
                                    }
                                }
                            );
                        });

                        // Combina la información del curso con la lista de estudiantes inscriptos
                        const courseWithEnrolledStudents: Course = { ...course, enrolledStudents };
                        return courseWithEnrolledStudents;
                    })
                );
            })
        );
    }

    
}