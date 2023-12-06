import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentEffects } from './store/students.effects';
import { studentFeature } from './store/students.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDialogComponent,
    StudentsTableComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
     //
     StoreModule.forFeature(studentFeature),
     EffectsModule.forFeature([StudentEffects])
  ],
  exports: [
    StudentsComponent
  ],
})
export class StudentsModule { }
