import { Component, OnInit } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']

})
export class StudentDetailComponent implements OnInit {
  student: Student | undefined;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const studentId = +params['id']; 
      this.studentsService.getStudentById$(studentId).subscribe((student) => {
        this.student = student;
      });
    });
  }
  goBack(): void {
    window.history.back();
  }
}