import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models';

export const StudentActions = createActionGroup({
    source: 'Student',
    events: {
        'Load Students': emptyProps(),
        'Load Students Success': props<{ students: Student[] }>(),
        'Load Students Failure': props<{ error: unknown[] }>(),

        'Create Student': props<{ student: Student }>(),
        'Create Student Failure': props<{ error: unknown }>(),

        'Edit Student': props<{ id: number, student: Student }>(),
        'Edit Student Failure': props<{ error: unknown }>(),

        'Delete Student': props<{ studentId: number }>(),
        'Delete Student Failure': props<{ error: unknown }>(),

        'Get Student by Id': props<{studentId: number}>(),
        'Get Student by Id Failure': props<{error: unknown}>(),

    }
});

