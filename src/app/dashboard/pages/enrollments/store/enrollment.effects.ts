import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { CreateEnrollmentPayload, Enrollment } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';


@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      
      //Filtra acciones "de tipo" ()
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.getEnrollments().pipe(
          map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });

  loadEnrollmentDialogOptions$ = createEffect(() => {
    return this.actions$.pipe(
      
      //Filtra acciones "de tipo" ()
      ofType(EnrollmentActions.loadEnrollmentDialogOptions),
      concatMap(() =>

        this.getEnrollmentDialogOptions().pipe(
          map(resp => EnrollmentActions.loadEnrollmentDialogOptionsSuccess( resp )),
          catchError((error) => of(EnrollmentActions.loadEnrollmentDialogOptionsFailure({ error }))))
      )
    );
  })

  createEnrollment$ = createEffect(() =>
     this.actions$.pipe(
      
      //Filtra acciones "de tipo" ()
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) => {

        return this.createEnrollment(action.payload).pipe(
          map((data) => EnrollmentActions.loadEnrollments()),
          catchError((error) => of(EnrollmentActions.createEnrollmentFailure({ error }))
          ));
        })
    )
  );

  deleteEnrollment$ = createEffect(() => this.actions$.pipe(
    ofType(EnrollmentActions.deleteEnrollment),

    concatMap((action) =>
      this.deleteEnrollment(action.id).pipe(
        map((r) =>
          EnrollmentActions.loadEnrollments()),
        catchError((error) =>
          of(EnrollmentActions.deleteEnrollmentFailure({ error })))
      ))
  ));


  constructor(private actions$: Actions, private httpClient: HttpClient) {}


  createEnrollment(payload: CreateEnrollmentPayload): Observable <Enrollment> {
    return this.httpClient.post<Enrollment>(`${environment.baseUrl}/enrollments`, payload)
  }

  getEnrollmentDialogOptions(): Observable<{
    courses: Course[];
    students: Student[];
  }> {
    return forkJoin([
      this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`),
    this.httpClient.get<Student[]>(`${environment.baseUrl}/students`
    )]).pipe(
      map(([courses, students]) => {
        return {
          courses,
          students,
        }
      })
    )
  }

  getEnrollments(): Observable<Enrollment[]>{
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?_expand=course&_expand=student`);
  }


  //Delete
  deleteEnrollment(id: number): Observable < Enrollment[] > {
    return this.httpClient.delete(`${environment.baseUrl}/enrollments/${id}`)
      .pipe(switchMap(() => this.getEnrollments()));
  }
}
