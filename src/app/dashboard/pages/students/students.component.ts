import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Student } from './models';
import { StudentsService } from './students.service';
import Swal from 'sweetalert2';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { StudentActions } from './store/students.actions';

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

      this.store.dispatch(StudentActions.loadStudents())

    }

    addStudent(): void {
      this.matDialog.open(StudentsDialogComponent).afterClosed().subscribe({
        next: (v) => {
          if (v) {
            const newStudent = {
              id: v.id,
              name: v.name,
              lastName: v.lastName,
              email: v.email,
            };
    
            this.store.dispatch(StudentActions.createStudent({ student: newStudent }));
          }
          
         }
      });
    }

    // onEditStudent(student: Student): void{
    //   this.matDialog.open(StudentsDialogComponent, {
    //     data: student,
    //   }).afterClosed().subscribe({
    //     next: (v) => {
    //        if (!!v){
    //         this.studentsService.updateStudent(student.id, v).subscribe(() => {
    //           this.students$ = this.studentsService.getStudents();
    //         })
    //      }
    //     },
    //   });
    // }
    onEditStudent(student: Student): void {
      this.matDialog.open(StudentsDialogComponent, {
        data: student,
      }).afterClosed().subscribe({
        next: (editedStudent) => {
          if (editedStudent) {
            this.store.dispatch(StudentActions.editStudent({ id: student.id, student: editedStudent }));
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
          this.store.dispatch(StudentActions.deleteStudent({ studentId }));
          Swal.fire('', 'El estudiante ha sido eliminado', 'success');
        }
      });
    }
}
