import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalOverviewComponent } from './component/personal-overview/personal-overview.component';
import { Routes } from '@angular/router';
import { AddPersonalComponent } from './component/add-personal/add-personal.component';

const routes: Routes = [
  { path: '', component: PersonalOverviewComponent}
]

@NgModule({
  declarations: [
    AddPersonalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PersonalManagementModule { }
