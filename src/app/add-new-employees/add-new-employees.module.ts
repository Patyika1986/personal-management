import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewEmployeesComponent } from './component/add-new-employees/add-new-employees.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddNewEmployeesComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AddNewEmployeesModule { }
