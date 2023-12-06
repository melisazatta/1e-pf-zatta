import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../models';

export const CourseActions = createActionGroup({
    source: 'Course',
    events: {
        'Load Courses': emptyProps(),
        'Load Courses Success': props<{ courses: Course[] }>(),
        'Load Courses Failure': props<{ error: unknown[] }>(),

        'Create Course': props<{ course: Course }>(),
        'Create Course Failure': props<{ error: unknown }>(),

        'Edit Course': props<{ id: number, course: Course }>(),
        'Edit Course Failure': props<{ error: unknown }>(),

        'Delete Course': props<{ id: number }>(),
        'Delete Course Failure': props<{ error: unknown }>(),

        'Get Course by Id': props<{courseId: number}>(),
        'Get Course by Id Failure': props<{error: unknown}>(),

    }
});

