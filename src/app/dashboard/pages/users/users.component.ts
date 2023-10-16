import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userName= '';

  users: User[] = [
    {
    id: 1,
    name: 'Jon',
    lastname: 'BonJovi',
    email: 'jbj@hotmail.com',
  },
  {
    id: 2,
    name: 'Juana',
    lastname: 'Lopez',
    email: 'juana@hotmail.com',
  },
  {
    id: 3,
    name: 'Marta',
    lastname: 'Fernandez',
    email: 'mf@hotmail.com',
  },
]

  constructor(
    private matDialog: MatDialog
    ){}

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

    onDeleteUser(userId: number): void{
      if (confirm('Esta seguro?')){
          this.users = this.users.filter((u) => u.id !== userId); 
      }
   
    }

}
