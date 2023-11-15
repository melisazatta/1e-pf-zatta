import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CoursesComponent
            },
            {
                path: 'detail/:id',
                component: CourseDetailComponent
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class CoursesRoutingModule { }
