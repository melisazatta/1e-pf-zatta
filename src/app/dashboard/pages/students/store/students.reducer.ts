import { createFeature, createReducer, on } from '@ngrx/store';
import {StudentActions} from '../store/students.actions';
import { Student } from '../models';

export const studentFeatureKey = 'student';

export interface State {
    isLoading: boolean;
    students: Student[];
    error: unknown;
 }

 export const initialState: State = {
    isLoading: false,
    students: [],
    error: null,
 };

export const studentReducer = createReducer(
  initialState,
  // reducers using on() from @ngrx/store
  on(StudentActions.loadStudents, (state) => ({ ...state, isLoading: true })),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({ ...state, 
    isLoading: false, students: students })),
    on(StudentActions.loadStudentsFailure, (state, {error}) => ({ ...state, isLoading: false, error })),

  on(StudentActions.createStudent, (state) => ({ ...state, isLoading: true })),
  on(StudentActions.createStudentFailure, (state, {error}) => ({ ...state, isLoading: true, error })),

  on(StudentActions.editStudent, (state) => ({ ...state, isLoading: false }
  )),
  on(StudentActions.editStudentFailure, (state, {error}) => ({ ...state, isLoading: false, error }
    )),

  on(StudentActions.deleteStudent, (state) =>({ ...state, isLoading: true }
    )),
    on(StudentActions.deleteStudentFailure, (state, {error}) =>({ ...state, isLoading: false, error }
        )),
    
);

export const studentFeature = createFeature({
    name: studentFeatureKey,
    reducer: studentReducer,
  });








