import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap, catchError } from 'rxjs/operators';
import {StudentActions} from '../store/students.actions';
import { StudentsService } from '../students.service';
import { of } from 'rxjs';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      concatMap(() =>
        this.StudentsService.getStudents().pipe(
          map(students => StudentActions.loadStudentsSuccess({ students })),
          catchError((error) => 
          of(StudentActions.loadStudentsFailure({error})
          ))
        ),
      ),
    ),
  );

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.createStudent),
      concatMap(({ student }) =>
        this.StudentsService.createStudent(student).pipe(
          map(() => StudentActions.loadStudents()),
          catchError((error) => 
          of(StudentActions.createStudentFailure({error})
          ))
        ),
      ),
    ),
  );

  editStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.editStudent),
      concatMap(({ id, student }) =>
        this.StudentsService.updateStudent(id, student).pipe(
          map(() => StudentActions.loadStudents()),
          catchError((error) => 
          of(StudentActions.editStudentFailure({error})
          ))
        ),
      ),
    ),
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      concatMap(({ studentId }) =>
        this.StudentsService.deleteStudent(studentId).pipe(
          map(() => StudentActions.loadStudents()),
          catchError((error) => 
          of(StudentActions.deleteStudentFailure({error})
          ))
        ),
      ),
    ),
  );

  getStudentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.getStudentById),
      concatMap(({ studentId }) =>
        this.StudentsService.getStudentById$(studentId).pipe(
          map(() => StudentActions.getStudentById({ studentId })),
          catchError((error) => 
          of(StudentActions.getStudentByIdFailure({error})
          ))
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private StudentsService: StudentsService) {}
}















