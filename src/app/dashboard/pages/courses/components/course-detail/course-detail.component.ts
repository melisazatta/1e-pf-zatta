import { Component, OnInit } from '@angular/core';
import { Course } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']

})
export class CourseDetailComponent implements OnInit{

  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = +params['id']; 
      this.coursesService.getCourseById$(courseId).subscribe((course) => {
        this.course = course;
      });
    });
  }
  goBack(): void {
    window.history.back();
  }

}
