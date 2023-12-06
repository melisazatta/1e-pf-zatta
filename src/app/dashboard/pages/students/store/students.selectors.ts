import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, studentFeatureKey } from './students.reducer';

export const selectStudentsState = createFeatureSelector<State>(studentFeatureKey);

export const selectStudents = createSelector(
  selectStudentsState,
  (state) => state.students
);

export const isLoadingStudents = createSelector(
  selectStudentsState,
  (state) => state.isLoading
);


export const selectStudentById = createSelector(
    selectStudentsState,
    (state: State, props: { studentId: number }) => {
      return state.students ? state.students.find(student => student.id === props.studentId) : undefined;
    }
  );