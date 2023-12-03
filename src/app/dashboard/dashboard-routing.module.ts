import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { EnrollmentsComponent } from "./pages/enrollments/enrollments.component";
import { DashboardComponent } from "./dashboard.component";
import { adminGuard } from "../core/guards/admin.guard";
import { Page404Component } from "../page404/page404.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: 'home',
                        loadChildren: () =>
                        import('./pages/home/home.module').then(
                            (m) => m.HomeModule
                        ),
                    },
                    {
                        path: 'users',
                        canActivate: [adminGuard],
                        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
                        // component: UsersComponent,
                    },
                    {
                        path: 'students',
                        loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule)
                 
                    },
              
                    {
                        path: 'courses',
                        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
                    },
                    {
                        path: 'enrollments',
                        loadChildren: () => import('./pages/enrollments/enrollments.module').then((m) => m.EnrollmentsModule)
                    },
                    {
                        path: '',
                        redirectTo: 'home', pathMatch: 'full',
                        
                    },
                    {
                      path: '**', 
                      component: Page404Component},
                ]

            }

        ]),
    ],
    exports: [RouterModule],
})
export class DashboardRoutingModule {

}