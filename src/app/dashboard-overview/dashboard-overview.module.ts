import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './component/dashboard-overview/dashboard-overview.component';
import { Routes } from '@angular/router';
import { CardsComponent } from './component/cards/cards.component';

const routes: Routes = [
  { path: '', component: DashboardOverviewComponent },
  { path: '', component: CardsComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardOverviewModule { }
