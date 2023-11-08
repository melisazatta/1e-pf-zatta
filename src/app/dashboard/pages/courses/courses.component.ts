import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService, private matDialog: MatDialog) {

    this.courses$ = this.coursesService.getCourses$()
  }

  addCourse(): void {
    this.matDialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.courses$ = this.coursesService.createCourse$({
            id: new Date().getTime(),
            name: result.name,
            startDate: result.startDate,
            endDate: result.endDate,
          });
        }
      },
    });
  }

  onEditCourse(courseId: number): void {
    this.matDialog.open(CoursesDialogComponent, {
      data: courseId,
    }).afterClosed().subscribe({
      next: (result) => {
        if (!!result) {
          this.courses$ = this.coursesService.editCourse$(courseId, result);
        }
      }
    });
  }

  // onDeleteCourse(courseId: number): void {
  //   this.courses$ = this.coursesService.deleteCourse$(courseId);
  // }
  onDeleteCourse(courseId: number): void {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de que desea eliminar este curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courses$ = this.coursesService.deleteCourse$(courseId);
        Swal.fire('Éxito', 'El curso ha sido eliminado', 'success');
      }
    });
  }
}
