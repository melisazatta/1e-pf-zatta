import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollmentPayload, Enrollment } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Enrollment Dialog Options': emptyProps(),
    'Load Enrollment Dialog Options Success': props<{ courses: Course[]; students: Student[]}>(),
    'Load Enrollment Dialog Options Failure': props<{ error: unknown}>(),
    'Create Enrollment': props<{ payload: CreateEnrollmentPayload}>(),
    'Create Enrollment Failure': props<{ error: unknown}>(),

     'Delete Enrollment': props<{ id: number}>(),
    // 'Delete Enrollment Success': props<{ id: number}>(),
     'Delete Enrollment Failure': props<{ error: unknown}>(),


  }
});
