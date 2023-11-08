import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  // userName= '';

  users: User[] = [];

  constructor(
    private matDialog: MatDialog, private usersService: UsersService
    ){
      this.users = this.usersService.getUsers();
    }

    openUsersDialog(): void {
      this.matDialog.open(UsersDialogComponent).afterClosed().subscribe({
        next: (v) => {
          console.log('Valor: ', v);
          if (!!v) {
            this.users = [
              ...this.users,
              {
              ...v, id: new Date().getTime(),
              },
            ];
          }
          
        }
      });
    }

    onEditUser(user: User): void{
      this.matDialog.open(UsersDialogComponent, {
        data: user,
      }).afterClosed().subscribe({
        next: (v) => {
          if (!!v){
        this.users = this.users.map((u) => u.id === user.id ? { ...u, ...v} : u
        );
        }
        },
      });
    }

    // onDeleteUser(userId: number): void{
    //   if (confirm('Esta seguro?')){
    //       this.users = this.users.filter((u) => u.id !== userId); 
    //   }
   
    // }
    onDeleteUser(userId: number): void {
      Swal.fire({
        title: 'Confirmación',
        text: '¿Está seguro de que desea eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter((u) => u.id !== userId);          
          Swal.fire('Éxito', 'El usuario ha sido eliminado', 'success');
        }
      });
    }
    
}
