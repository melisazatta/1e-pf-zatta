import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../models';
import { Store } from '@ngrx/store';
import { selectEnrollments } from '../../store/enrollment.selectors';
import Swal from 'sweetalert2';
import { EnrollmentActions } from '../../store/enrollment.actions';

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


/////

deleteEnrollment(id: number): void {
  Swal.fire({
    title: 'Esta seguro?',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    heightAuto: false,
  }).then((result) => {
    if (result.isConfirmed) {
      this.store.dispatch(EnrollmentActions.deleteEnrollment({ id }));
      this.enrollments$ = this.store.select(selectEnrollments)
    Swal.fire({
      title: 'Inscripcion eliminada!',
      icon: 'success',
      confirmButtonText: 'OK',
      heightAuto: false,
      timer: 2500,
      timerProgressBar: true,
    })}
  })
}
}

// onDeleteCourse(courseId: number): void {
//   Swal.fire({
//     text: '¿Está seguro de que desea eliminar este curso?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Sí',
//     cancelButtonText: 'No'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.courses$ = this.coursesService.deleteCourse$(courseId);
//       Swal.fire('', 'El curso ha sido eliminado', 'success');
//     }
//   });
// }

