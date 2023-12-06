import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserRole } from '../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { selectUsers } from '../../store/users.selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styles: [
  ]
})
export class UsersTableComponent {

  @Input() 
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();


  displayedColumns= ['id', 'fullname', 'email', 'role', 'actions'];

  userRole$: Observable<UserRole | undefined>

  users$: Observable<User[]>


  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role))

    this.users$ = this.store.select(selectUsers)
  }

  goToDetail(userId: number): void {
    this.router.navigate(['dashboard', 'users', 'detail', userId]);

  }

}
