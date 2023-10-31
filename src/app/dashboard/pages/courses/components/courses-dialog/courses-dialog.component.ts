import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.css']
})
export class CoursesDialogComponent {

  nameControl = new FormControl();
  startDateControl = new FormControl();
  endDateControl = new FormControl();

  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  });

  constructor(private matDialogRef: MatDialogRef<CoursesDialogComponent>){

  }

  onSubmit(): void {
    if (this.courseForm.invalid){
      return this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value)
        }
  }

}
