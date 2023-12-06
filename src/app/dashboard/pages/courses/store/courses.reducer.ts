import { createFeature, createReducer, on } from '@ngrx/store';
import {CourseActions} from '../store/courses.actions';
import { Course } from '../models';

export const courseFeatureKey = 'course';

export interface State {
    isLoading: boolean;
    courses: Course[];
    error: unknown;
 }

 export const initialState: State = {
    isLoading: false,
    courses: [],
    error: null,
 };

export const courseReducer = createReducer(
  initialState,
  // reducers using on() from @ngrx/store
  on(CourseActions.loadCourses, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({ ...state, 
    isLoading: false, courses: courses })),
    on(CourseActions.loadCoursesFailure, (state, {error}) => ({ ...state, isLoading: false, error })),

  on(CourseActions.createCourse, (state) => ({ ...state, isLoading: true })),
  on(CourseActions.createCourseFailure, (state, {error}) => ({ ...state, isLoading: true, error })),

  on(CourseActions.editCourse, (state) => ({ ...state, isLoading: false }
  )),
  on(CourseActions.editCourseFailure, (state, {error}) => ({ ...state, isLoading: false, error }
    )),

  on(CourseActions.deleteCourse, (state) =>({ ...state, isLoading: true }
    )),
    on(CourseActions.deleteCourseFailure, (state, {error}) =>({ ...state, isLoading: false, error }
        )),
    
);

export const courseFeature = createFeature({
    name: courseFeatureKey,
    reducer: courseReducer,
  });








