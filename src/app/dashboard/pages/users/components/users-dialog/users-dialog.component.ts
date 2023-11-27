import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styles: [
  ]
})
export class UsersDialogComponent {
  userForm: FormGroup;

  roleOptions: Observable<String[]> | undefined


  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<UsersDialogComponent>, @Inject(MAT_DIALOG_DATA)public user?: User,) {
   this.userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['',[Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(3)]],
    role: ['', Validators.required]
    
    });

    //
    const roleControl = this.userForm.get('role');

    if (roleControl) {
      this.roleOptions = roleControl.valueChanges.pipe(
        startWith(null), // Incluye el valor inicial
        map(value => this.filterRoles(value))
      );
    }

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  //filtrar roles en función del valor actual
  private filterRoles(value: string | null): string[] {
  const roles: string[] = ['admin', 'user']; // Ajusta según tus roles
  const filterValue = (value || '') // Usar una cadena vacía si value es nulo

  return roles.filter(role => role.includes(filterValue));
}

  onSubmit(): void{
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);

    }
  }

}
