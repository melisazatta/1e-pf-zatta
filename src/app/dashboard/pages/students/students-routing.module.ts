import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: StudentsComponent
            },
            {
                path: 'detail/:id',
                component: StudentDetailComponent
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class StudentsRoutingModule {}
