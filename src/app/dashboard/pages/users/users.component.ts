import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { generarStringRandom } from 'src/app/shared/helpers';
import { UserActions } from './store/users.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  // dataSource(dataSource: any) {
  //   throw new Error('Method not implemented.');
  // }
  // userName= '';

  users$: Observable<User[]>;

  constructor(
    private matDialog: MatDialog, private usersService: UsersService, private store: Store
    ){
      this.users$ = this.usersService.getUsers();

      this.store.dispatch(UserActions.loadUsers())
    }

    //         this.users$ = this.usersService.createUser(userWithToken);
   
    addUser(): void {
      this.matDialog.open(UsersDialogComponent).afterClosed().subscribe({
        next: (v) => {
          if (!!v) {
            const userWithToken = {
              ...v,
              token: generarStringRandom(32),
            };
    
            // Dispatch the addUserSuccess action
            this.store.dispatch(UserActions.createUser({ user: userWithToken }));
          }
        },
      });
    }

    onEditUser(user: User): void{
      this.matDialog.open(UsersDialogComponent, {
        data: user,
      }).afterClosed().subscribe({
        next: (v) => {
          if (!!v){
            //toma los datos del usuario y el token
            const updatedUser = {
              ...user,
              ...v,
              token: user.token,
            };
        // this.users$ = this.usersService.updateUser(user.id, updatedUser);
        this.store.dispatch(UserActions.editUser({ id: user.id, user: updatedUser }));
         }
        },
       });
     }
    onDeleteUser(userId: number): void {
      Swal.fire({
        text: '¿Está seguro de que desea eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          // this.users$ = this.usersService.deleteUser(userId);  
          this.store.dispatch(UserActions.deleteUser({ userId }));        
          Swal.fire('', 'El usuario ha sido eliminado', 'success');
        }
      });
    }    
}
