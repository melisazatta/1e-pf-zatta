import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Student } from './models';
import { StudentsService } from './students.service';
import Swal from 'sweetalert2';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  studentName= '';

  students$: Observable <Student[]>;

  userRole$: Observable<'admin' | 'user' | undefined>

  constructor(
    private matDialog: MatDialog, private studentsService: StudentsService, private store: Store
    ){
      this.userRole$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role))
      
      this.students$ = this.studentsService.getStudents();
    }

    addStudent(): void {
      this.matDialog.open(StudentsDialogComponent).afterClosed().subscribe({
        next: (v) => {
          if (!!v) {
           this.students$ = this.studentsService.createStudent(v)
           }
          
         }
      });
    }

    onEditStudent(student: Student): void{
      this.matDialog.open(StudentsDialogComponent, {
        data: student,
      }).afterClosed().subscribe({
        next: (v) => {
           if (!!v){
         this.students$ = this.studentsService.updateStudent(student.id, v)
         }
        },
      });
    }

    onDeleteStudent(studentId: number): void {
      Swal.fire({
        text: '¿Está seguro de que desea eliminar este estudiante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
           this.students$ = this.studentsService.deleteStudent(studentId);
           Swal.fire('', 'El estudiante ha sido eliminado', 'success');
        }
      });
    }
    
}
