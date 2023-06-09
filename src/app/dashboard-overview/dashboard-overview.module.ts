import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './component/dashboard-overview/dashboard-overview.component';
import { Routes } from '@angular/router';
import { CardsComponent } from './component/cards/cards.component';
import { EmployeeRequestsComponent } from './component/employee-requests/employee-requests.component';
import { AllNotificationOfIllnessComponent } from './component/all-notification-of-illness/all-notification-of-illness.component';

const routes: Routes = [
  { path: '', component: DashboardOverviewComponent },
  { path: '', component: CardsComponent },
  { path: '', component: EmployeeRequestsComponent },
  { path: '', component: AllNotificationOfIllnessComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardOverviewModule { }
