import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { isLoadingCourses, selectCourses } from '../../store/courses.selectors';

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

  courses$: Observable<Course[]>
  isLoading$: Observable<boolean>

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role))

    this.courses$ = this.store.select(selectCourses)
    this.isLoading$ = this.store.select(isLoadingCourses)
  }

  goToDetail(courseId: number): void {
    this.router.navigate(['dashboard', 'courses', 'detail', courseId]);

  }
}
