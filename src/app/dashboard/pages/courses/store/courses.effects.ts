import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap, catchError } from 'rxjs/operators';
import {CourseActions} from '../store/courses.actions';
import { CoursesService } from '../courses.service';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses$().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) => 
          of(CourseActions.loadCoursesFailure({error})
          ))
        ),
      ),
    ),
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createCourse),
      concatMap(({ course }) =>
        this.coursesService.createCourse$(course).pipe(
          map(() => CourseActions.loadCourses()),
          catchError((error) => 
          of(CourseActions.createCourseFailure({error})
          ))
        ),
      ),
    ),
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.editCourse),
      concatMap(({ id, course }) =>
        this.coursesService.editCourse$(id, course).pipe(
          map(() => CourseActions.loadCourses()),
          catchError((error) => 
          of(CourseActions.editCourseFailure({error})
          ))
        ),
      ),
    ),
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      concatMap(({ id }) =>
        this.coursesService.deleteCourse$(id).pipe(
          map(() => CourseActions.loadCourses()),
          catchError((error) => 
          of(CourseActions.deleteCourseFailure({error})
          ))
        ),
      ),
    ),
  );

  getCourseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.getCourseById),
      concatMap(({ courseId }) =>
        this.coursesService.getCourseById$(courseId).pipe(
          map(() => CourseActions.getCourseById({ courseId })),
          catchError((error) => 
          of(CourseActions.getCourseByIdFailure({error})
          ))
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}















