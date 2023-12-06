import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from './users.reducer';

export const selectUsersState = createFeatureSelector<State>(userFeatureKey);

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const isLoadingUsers = createSelector(
  selectUsersState,
  (state) => state.isLoading
);


export const selectUserById = createSelector(
    selectUsersState,
    (state: State, props: { userId: number }) => {
      return state.users ? state.users.find(user => user.id === props.userId) : undefined;
    }
  );