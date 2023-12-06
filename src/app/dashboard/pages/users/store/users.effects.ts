import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap, catchError } from 'rxjs/operators';
import {UserActions} from '../store/users.actions';
import { UsersService } from '../users.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.UsersService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError((error) => 
          of(UserActions.loadUsersFailure({error})
          ))
        ),
      ),
    ),
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      concatMap(({ user }) =>
        this.UsersService.createUser(user).pipe(
          map(() => UserActions.loadUsers()),
          catchError((error) => 
          of(UserActions.createUserFailure({error})
          ))
        ),
      ),
    ),
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      concatMap(({ id, user }) =>
        this.UsersService.updateUser(id, user).pipe(
          map(() => UserActions.loadUsers()),
          catchError((error) => 
          of(UserActions.editUserFailure({error})
          ))
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap(({ userId }) =>
        this.UsersService.deleteUser(userId).pipe(
          map(() => UserActions.loadUsers()),
          catchError((error) => 
          of(UserActions.deleteUserFailure({error})
          ))
        ),
      ),
    ),
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      concatMap(({ userId }) =>
        this.UsersService.getUserById$(userId).pipe(
          map(() => UserActions.getUserById({ userId })),
          catchError((error) => 
          of(UserActions.getUserByIdFailure({error})
          ))
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private UsersService: UsersService) {}
}