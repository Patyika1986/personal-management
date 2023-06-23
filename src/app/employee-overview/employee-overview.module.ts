import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './component/employee/employee.component';
import { Routes } from '@angular/router';

const routes:Routes = [
  { path: '', component: EmployeeComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EmployeeOverviewModule { }
