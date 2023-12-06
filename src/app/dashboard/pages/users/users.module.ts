import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { userFeature } from './store/users.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/users.effects';


@NgModule({
  declarations: [
    UsersComponent, UsersDialogComponent, UsersTableComponent, UserDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
     //
     StoreModule.forFeature(userFeature),
     EffectsModule.forFeature([UserEffects])
  ],
  exports: [
    UsersComponent
  ],
})
export class UsersModule { }
