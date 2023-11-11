import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';


@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styles: [
  ]
})
export class StudentsDialogComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<StudentsDialogComponent>, @Inject(MAT_DIALOG_DATA)public student?: Student,) {
   this.studentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['',[Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    
    });
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit(): void{
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);

    }
  }

}
