import { Injectable } from "@angular/core";
import { Course } from "./models";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root'})
export class CoursesService {

    courses: Course[] = [
        {
        id: 1,
        name: 'Angular',
        startDate: new Date(),
        endDate: new Date(),
    },
    {
        id: 2,
        name: 'React',
        startDate: new Date(),
        endDate: new Date(),
    }
    ];

    getCourses$(): Observable<Course[]>{
        return of(this.courses);
    }

    createCourse$(payload: Course): Observable<Course[]> {
        this.courses.push(payload);
        return of([...this.courses]);
    }

    editCourse$(id: number, payload: Course): Observable<Course[]> {
        this.courses.push(payload);
        return of(this.courses.map((c) => c.id === id ? { ...c, ...payload} : c));
    }
}