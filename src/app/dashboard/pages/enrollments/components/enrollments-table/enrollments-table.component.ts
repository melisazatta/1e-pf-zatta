import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../models';
import { Store } from '@ngrx/store';
import { selectEnrollments } from '../../store/enrollment.selectors';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.css']
})
export class EnrollmentsTableComponent {
  displayedColumns= ['id', 'course', 'student', 'actions'];

enrollments$ : Observable<Enrollment[]>;

constructor(private store: Store) {
  this.enrollments$ = this.store.select(selectEnrollments);
}
}

