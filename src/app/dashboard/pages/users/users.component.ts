import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  // userName= '';

  users$: Observable<User[]>;

  constructor(
    private matDialog: MatDialog, private usersService: UsersService
    ){
      this.users$ = this.usersService.getUsers();
    }

    addUser(): void {
      this.matDialog.open(UsersDialogComponent).afterClosed().subscribe({
        next: (v) => {
          if (!!v) {
            this.users$ = this.usersService.createUser(v)
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
        this.users$ = this.usersService.updateUser(user.id, v);
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
          this.users$ = this.usersService.deleteUser(userId);          
          Swal.fire('', 'El usuario ha sido eliminado', 'success');
        }
      });
    }    
}
