import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { selectStudents } from '../../store/students.selectors';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styles: [
  ]
})
export class StudentsTableComponent {

  @Input() 
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<Student>();


  displayedColumns= ['id', 'fullname', 'email', 'actions'];

  userRole$: Observable<'admin' | 'user' | undefined>

  students$: Observable<Student[]>

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role))

    this.students$ = this.store.select(selectStudents)

  }

  goToDetail(studentId: number): void {
    this.router.navigate(['dashboard', 'students', 'detail', studentId]);

  }

}
