import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Student } from './models';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  studentName= '';

  students: Student[] = [];

  constructor(
    private matDialog: MatDialog, private studentsService: StudentsService
    ){
      this.students = this.studentsService.getStudents();
    }

    openStudentsDialog(): void {
      this.matDialog.open(StudentsDialogComponent).afterClosed().subscribe({
        next: (v) => {
          console.log('Valor: ', v);
          if (!!v) {
            this.students = [
              ...this.students,
              {
              ...v, id: new Date().getTime(),
              },
            ];
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
        this.students = this.students.map((s) => s.id === student.id ? { ...s, ...v} : s
        );
        }
        },
      });
    }

    onDeleteStudent(studentId: number): void{
      if (confirm('Esta seguro?')){
          this.students = this.students.filter((s) => s.id !== studentId); 
      }
   
    }
    
}
