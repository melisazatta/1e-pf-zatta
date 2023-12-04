import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { PieChartService } from './piechart.service';
import { Enrollment } from '../../enrollments/models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PieChartComponent implements OnInit {
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 20,
          },
        },
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
        font: {
          size: 22,
        }
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(private http: HttpClient, private pieChartService: PieChartService) {}

  ngOnInit(): void {
    this.getDataFromAPI();
  }

  public data: { students: Student[]; courses: Course[]; enrollments: Enrollment[] } = {
    students: [],
    courses: [],
    enrollments: [],
  };

  getDataFromAPI(): void {
    forkJoin([
      this.pieChartService.getEnrollments(),
      this.pieChartService.getCourses(),
      this.pieChartService.getStudents(),
    ]).subscribe(
      ([enrollments, courses, students]) => {
        this.data = { enrollments, courses, students };
        this.processData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  public processData(): void {
    if (!this.data || !this.data.courses || !this.data.enrollments || !this.data.students) {
      console.log('Courses, enrollments, or students data is missing.');
      return;
    }

    // Update labels and datasets to show courses, students, and enrollments
    this.pieChartData = {
      labels: ['Cursos', 'Alumnos', 'Inscripciones'],
      datasets: [
        {
          data: [this.data.courses.length, this.data.students.length, this.data.enrollments.length],
          backgroundColor: this.pieChartData.datasets[0].backgroundColor = ['#bc98f3', '#bae0f5', '#f47edd']

        },
      ],
    };
  }
}
