import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard.guard';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    
    //LazyLoading
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
   
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
      path: '',
      redirectTo: 'dashboard/home', pathMatch: 'full',
      
  },
  {
    path: '**', 
    component: Page404Component},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
