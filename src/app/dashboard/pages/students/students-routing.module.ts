import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';


const routes: Routes = [
        {
            path: '',
            component: StudentsComponent
        },
        {
            path: 'detail/:id',
            component: StudentDetailComponent
        }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentsRoutingModule {}
