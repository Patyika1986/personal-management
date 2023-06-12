import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './component/dashboard-overview/dashboard-overview.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardOverviewComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardOverviewModule { }
