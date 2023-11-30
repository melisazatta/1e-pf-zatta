import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent {

  @Input()
  dataSource: Course[] = [];

  @Output()
  editCourse = new EventEmitter();

  @Output()
  deleteCourse = new EventEmitter();

  displayedColumns = ['id', 'name', 'startDate', 'endDate','actions']

  userRole$: Observable<'admin' | 'user' | undefined>

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role))
  }

  goToDetail(courseId: number): void {
    this.router.navigate(['dashboard', 'courses', 'detail', courseId]);

  }
}
