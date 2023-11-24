import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import { Observable, take } from 'rxjs';
import { selectCourseOptions, selectStudentOptions } from '../../store/enrollment.selectors';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.css']
})
export class EnrollmentDialogComponent {
  studentIdControl = new FormControl(<number | null>(null), Validators.required);
  courseIdControl = new FormControl(<number | null>(null), Validators.required);

  enrollmentForm =  new FormGroup({
    "courseId": this.courseIdControl,
    "studentId": this.studentIdControl,

  });

  courseOptions$: Observable<Course[]>
  studentOptions$: Observable<Student[]>
  
  constructor(private store: Store, private action$: Actions, private matDialogRef: MatDialogRef<EnrollmentDialogComponent>) {
    this.store.dispatch(EnrollmentActions.loadEnrollmentDialogOptions())

    this.courseOptions$ = this.store.select(selectCourseOptions)
    this.studentOptions$ = this.store.select(selectStudentOptions)

    this.action$.pipe(ofType(EnrollmentActions.loadEnrollments), take(1)).subscribe({
      next: () => this.matDialogRef.close(),
    });
  }

  onSubmit(): void {
    this.store.dispatch(EnrollmentActions.createEnrollment({ payload: this.enrollmentForm.getRawValue()}))
  }

}
