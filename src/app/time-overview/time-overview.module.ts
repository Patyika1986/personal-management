import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTimeComponent } from './component/employee-time/employee-time.component';
import { Routes } from '@angular/router';
import { VacationRequestComponent } from './component/vacation-request/vacation-request.component';
import { NotificationOfIllnessComponent } from './component/notification-of-illness/notification-of-illness.component';
import { VacationAndSickOverviewComponent } from './component/vacation-and-sick-overview/vacation-and-sick-overview.component';

const routes: Routes = [
  { path: '', component: EmployeeTimeComponent },
  { path: '', component: VacationRequestComponent },
  { path: '', component: NotificationOfIllnessComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TimeOverviewModule { }
