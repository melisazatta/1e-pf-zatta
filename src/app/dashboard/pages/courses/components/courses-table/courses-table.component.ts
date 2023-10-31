import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent {

  @Input()
  dataSource: Course[] = [];

  @Output()
  addCourse = new EventEmitter();

  displayedColumns = ['id', 'name', 'startDate', 'endDate','actions']

}
