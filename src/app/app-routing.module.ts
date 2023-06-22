import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/component/dashboard-overview/dashboard-overview.component';
import { PersonalOverviewComponent } from './personal-management/component/personal-overview/personal-overview.component';
import { AddPersonalComponent } from './personal-management/component/add-personal/add-personal.component';
import { AddNewEmployeesComponent } from './add-new-employees/component/add-new-employees/add-new-employees.component';
import { OrderOverviewComponent } from './order/component/order-overview/order-overview.component';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard-overview/dashboard-overview.module').then(dasboard => dasboard.DashboardOverviewModule)},
  { path: 'personal', loadChildren: () => import('./personal-management/personal-management.module').then(personal => personal.PersonalManagementModule)},
  { path: 'personal-module', loadChildren: () => import('./service/personal/personal.module').then(personal => personal.PersonalModule)},
  { path: 'add-new-employees', loadChildren: () => import('./add-new-employees/add-new-employees.module').then(newEmployees => newEmployees.AddNewEmployeesModule)},
  { path: 'order-module', loadChildren: () => import('./order/order.module').then(order => order.OrderModule)},
  { path: 'dashboard-overview', component: DashboardOverviewComponent },
  { path: 'personal-overview', component: PersonalOverviewComponent },
  { path: 'add-personal', component: AddPersonalComponent },
  { path: 'add-new-employe', component: AddNewEmployeesComponent },
  { path: 'order-overview', component: OrderOverviewComponent },
  { path: '', redirectTo: 'dashboard-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
