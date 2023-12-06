import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
    source: 'User',
    events: {
        'Load Users': emptyProps(),
        'Load Users Success': props<{ users: User[] }>(),
        'Load Users Failure': props<{ error: unknown[] }>(),

        'Create User': props<{ user: User }>(),
        'Create User Failure': props<{ error: unknown }>(),

        'Edit User': props<{ id: number, user: User }>(),
        'Edit User Failure': props<{ error: unknown }>(),

        'Delete User': props<{ userId: number }>(),
        'Delete User Failure': props<{ error: unknown }>(),

        'Get User by Id': props<{userId: number}>(),
        'Get User by Id Failure': props<{error: unknown}>(),

    }
});

