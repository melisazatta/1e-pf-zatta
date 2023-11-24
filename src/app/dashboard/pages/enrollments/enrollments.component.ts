import { Component } from '@angular/core';
import { EnrollmentActions } from './store/enrollment.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent {
  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  addEnrollment(): void {
    this.dialog.open(EnrollmentDialogComponent);
  }

}
