import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalOverviewComponent } from './component/personal-overview/personal-overview.component';
import { Routes } from '@angular/router';
import { AddPersonalComponent } from './component/add-personal/add-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: PersonalOverviewComponent},
  { path: '', component: AddPersonalComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PersonalManagementModule { }
