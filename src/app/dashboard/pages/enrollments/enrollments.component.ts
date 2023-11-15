import { Component } from '@angular/core';
import { EnrollmentActions } from './store/enrollment.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent {
  constructor(private store: Store) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

}
