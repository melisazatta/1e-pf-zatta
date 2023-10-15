import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormModule } from './pages/form/form.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UsersModule } from './pages/users/users.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule, 
    MatButtonModule,
    FormModule,
    MatToolbarModule,
    MatIconModule,
    UsersModule
    ],
  exports: [
    DashboardComponent
  ],
})
export class DashboardModule { }
