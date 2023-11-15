import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';

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

  userRole$: Observable<'ADMIN' | 'USER' | undefined>

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role))
  }

  goToDetail(studentId: number): void {
    this.router.navigate(['dashboard', 'students', 'detail', studentId]);

  }

}
