import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PieChartComponent } from './piechart/piechart.component';
import { NgChartsModule } from 'ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PieChartService } from './piechart/piechart.service';



@NgModule({
  declarations: [
    HomeComponent, 
    PieChartComponent],
    providers: [
      PieChartService, 
    ],
    
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgChartsModule,
    HttpClientModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
