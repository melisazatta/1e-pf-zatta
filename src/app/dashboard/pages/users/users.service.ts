import { Injectable } from '@angular/core';
import { User } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable, concat, concatMap } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable <User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`);
  }

    createUser(payload: User): Observable<User[]> {
      return this.httpClient.post<User>(`${environment.baseUrl}/users`, payload).pipe(concatMap(() => this.getUsers()
      ));
    }
    
    updateUser(userId: number, payload: User): Observable<User[]> {
      return this.httpClient.put<User>(`${environment.baseUrl}/users/${userId}`, payload).pipe(concatMap(() => this.getUsers()
      ));
    }
    
    deleteUser(userId: number): Observable<User[]> {
      return this.httpClient.delete<User>(`${environment.baseUrl}/users/${userId}`).pipe(concatMap(() => this.getUsers()
      ));
    }

    getUserById$(userId: number): Observable<User | undefined> {
      return this.httpClient.get<User>(`${environment.baseUrl}/users/${userId}`)
    }
  
  }
