import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalOverviewComponent } from './component/personal-overview/personal-overview.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PersonalOverviewComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PersonalManagementModule { }
