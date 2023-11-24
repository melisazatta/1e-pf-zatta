import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  isLoading: boolean;
  isLoadingDialogOptions: boolean;
  courseOptions: Course[];
  studentOptions: Student[];
  enrollments: Enrollment[];
  error: unknown;

}

export const initialState: State = {
  isLoading: false,
  isLoadingDialogOptions: false,
  enrollments: [],
  courseOptions: [],
  studentOptions: [],
  error: null,

};

export const reducer = createReducer(
  initialState,
  //loadEnrollments
  on(EnrollmentActions.loadEnrollments, state => ({
    ...state, isLoading: true})),
    //loadEnrollmentsSuccess
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, {data}) => ({...state, isLoading: false, enrollments: data })),
  //loadEnrollmentsFailure
  on(EnrollmentActions.loadEnrollmentsFailure, (state, {error}) => ({...state, isLoading: false, error})),

  //LoadEnrollmentDialogOptions
  on(EnrollmentActions.loadEnrollmentDialogOptions, ( state) => {
    return {
      ...state, isLoadingDialogOptions: true,
    }
  }),

  //LoadEnrollmentDialogOptionsSuccess
  on(EnrollmentActions.loadEnrollmentDialogOptionsSuccess, (state, action) => ({
    ...state, courseOptions: action.courses, 
    studentOptions: action.students,
    isLoadingDialogOptions: false
  })),

   //LoadEnrollmentDialogOptionsFailure
   on(EnrollmentActions.loadEnrollmentDialogOptionsFailure, (state, action) => ({
    ...state, error: action.error,
    isLoadingDialogOptions: false
  })),



  //Delete

  // on(EnrollmentActions.deleteEnrollment, ( state) => {
  //   return {
  //     ...state,
  //   }
  // }),

  //DeleteEnrollmentDialogOptionsSuccess
  // on(EnrollmentActions.deleteEnrollmentSuccess, (state, action) => {
  //   const updatedEnrollments = state.enrollments.filter(enrollment => enrollment.id !== action.id);

  // return {
  //   ...state,
  //   enrollments: updatedEnrollments,
  // };
  // }),


  // on(EnrollmentActions.deleteEnrollmentFailure, (state, action) => ({
  //   ...state, 
  //   error: action.error,
  // }))
  on(EnrollmentActions.deleteEnrollment, (state) => (
    {
      ...state,
      isLoading: true
    }
  )),

  on(EnrollmentActions.deleteEnrollmentFailure, (state, { error }) => (
    {
      ...state,
      isLoading: false,
      error
    }
  )),
);



export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});

