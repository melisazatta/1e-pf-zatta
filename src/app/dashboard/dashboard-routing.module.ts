import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { StudentsComponent } from "./pages/students/students.component";
import { UserDetailComponent } from "./pages/users/components/user-detail/user-detail.component";
import { StudentDetailComponent } from "./pages/students/components/student-detail/student-detail.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { EnrollmentsComponent } from "./pages/enrollments/enrollments.component";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: 'home',
                        component: HomeComponent,
                    },
                    {
                        path: 'users',
                        loadChildren: () => import('./pages/users/users.module').then((m)=> m.UsersModule)
                        // component: UsersComponent,
                    },
                    {
                        path: 'students',
                        loadChildren: () => import('./pages/students/students.module').then((m)=> m.StudentsModule)
                        // component: StudentsComponent,
                    },
                    {
                        path: 'users/detail/:id',
                        component: UserDetailComponent,
                    },
                    {
                        path: 'students/detail/:id',
                        component: StudentDetailComponent,
                    },
                    {
                        path: 'courses',
                        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
                        // component: CoursesComponent,
                    },
                    {
                        path: 'enrollments',
                        component: EnrollmentsComponent,
                    },
                    {
                        path: '**',
                        redirectTo: 'home',
                    },
                ]

            }

        ]),
    ],
    exports: [RouterModule],
})
export class DashboardRoutingModule {

}