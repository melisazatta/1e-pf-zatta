import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';


const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'register',
                loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule),
            },
            {
                path: 'login',
                loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
            },
            {
                path: '**',
                redirectTo: 'login',
            },
        ],
    },

    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
