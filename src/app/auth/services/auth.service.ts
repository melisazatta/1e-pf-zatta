import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models';
import { environment } from 'src/environments/environment.local';
import { LoginPayload,  } from '../models';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this.store.select(selectAuthUser)
  // public authUser$ = this._authUser$.asObservable();

  constructor(private httpClient: HttpClient, private router: Router, private store: Store) { }

  private handleAuthUser(authUser: User): void {
    // this._authUser$.next(authUser);
    this.store.dispatch(AuthActions.setAuthUser({data: authUser}))

    localStorage.setItem('token', authUser.token);

  }

  login(payload: LoginPayload): void {

    // const headers = new HttpHeaders({
    //   token: localStorage.getItem('token') || 'NO HAY TOKEN',
    // });

    this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`,
        // {
        //   headers: headers,
        // }
      )
      .subscribe({
        next: (response) => {
          if (!response.length) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Usuario o contraseña inválidos',
            });          } else {
            const authUser = response[0];

            this.handleAuthUser(authUser);
            // this._authUser$.next(authUser);

            // localStorage.setItem('token', authUser.token);
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error de conexión',
          });        },
      });


    // this._authUser$.next(user);
    // return of<User>(user);
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this.handleAuthUser(authUser);

            // this._authUser$.next(authUser);
            // localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
  }

  logout(): void {
    // this._authUser$.next(null);
    this.store.dispatch(AuthActions.resetState())
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

}



  /////////////////////////
  // register(payload: RegisterPayload): Observable<boolean> {
  //   return this.httpClient.post<User>(
  //     `${environment.baseUrl}/users/register`,
  //     payload
  //   ).pipe(
  //     map((user) => {
  //       if (user) {
  //         this._authUser$.next(user);
  //         localStorage.setItem('token', user.token);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     })
  //   );
  // }
  ////////////////////////