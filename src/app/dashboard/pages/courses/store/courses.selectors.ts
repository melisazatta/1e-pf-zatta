import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, courseFeatureKey } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<State>(courseFeatureKey);

export const selectCourses = createSelector(
  selectCoursesState,
  (state) => state.courses
);

export const isLoadingCourses = createSelector(
  selectCoursesState,
  (state) => state.isLoading
);


export const selectCourseById = createSelector(
    selectCoursesState,
    (state: State, props: { courseId: number }) => {
      return state.courses ? state.courses.find(course => course.id === props.courseId) : undefined;
    }
  );