import { createFeature, createReducer, on } from '@ngrx/store';
import {UserActions} from '../store/users.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
    isLoading: boolean;
    users: User[];
    error: unknown;
 }

 export const initialState: State = {
    isLoading: false,
    users: [],
    error: null,
 };

export const userReducer = createReducer(
  initialState,
  // reducers using on() from @ngrx/store
  on(UserActions.loadUsers, (state) => ({ ...state, isLoading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, 
    isLoading: false, users: users })),
    on(UserActions.loadUsersFailure, (state, {error}) => ({ ...state, isLoading: false, error })),

  on(UserActions.createUser, (state) => ({ ...state, isLoading: true })),
  on(UserActions.createUserFailure, (state, {error}) => ({ ...state, isLoading: true, error })),

  on(UserActions.editUser, (state) => ({ ...state, isLoading: false }
  )),
  on(UserActions.editUserFailure, (state, {error}) => ({ ...state, isLoading: false, error }
    )),

  on(UserActions.deleteUser, (state) =>({ ...state, isLoading: true }
    )),
    on(UserActions.deleteUserFailure, (state, {error}) =>({ ...state, isLoading: false, error }
        )),
    
);

export const userFeature = createFeature({
    name: userFeatureKey,
    reducer: userReducer,
  });