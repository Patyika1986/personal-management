import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/component/dashboard-overview/dashboard-overview.component';
import { PersonalOverviewComponent } from './personal-management/component/personal-overview/personal-overview.component';
import { AddPersonalComponent } from './personal-management/component/add-personal/add-personal.component';
import { AddNewEmployeesComponent } from './add-new-employees/component/add-new-employees/add-new-employees.component';
import { OrderOverviewComponent } from './order/component/order-overview/order-overview.component';
import { CurrentOrdersOverviewComponent } from './order/component/current-orders-overview/current-orders-overview.component';
import { LoginComponent } from './login/component/login/login.component';
import { EmployeeComponent } from './employee-overview/component/employee/employee.component';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard-overview/dashboard-overview.module').then(dasboard => dasboard.DashboardOverviewModule)},
  { path: 'personal', loadChildren: () => import('./personal-management/personal-management.module').then(personal => personal.PersonalManagementModule)},
  { path: 'personal-module', loadChildren: () => import('./service/personal/personal.module').then(personal => personal.PersonalModule)},
  { path: 'add-new-employees', loadChildren: () => import('./add-new-employees/add-new-employees.module').then(newEmployees => newEmployees.AddNewEmployeesModule)},
  { path: 'order-module', loadChildren: () => import('./order/order.module').then(order => order.OrderModule)},
  { path: 'login-module', loadChildren: () => import('./login/login.module').then(login => login.LoginModule)},
  { path: 'employee-module', loadChildren: () => import('./employee-overview/employee-overview.module').then(emp => emp.EmployeeOverviewModule)},
  { path: 'dashboard-overview', component: DashboardOverviewComponent },
  { path: 'personal-overview', component: PersonalOverviewComponent },
  { path: 'add-personal', component: AddPersonalComponent },
  { path: 'add-new-employe', component: AddNewEmployeesComponent },
  { path: 'order-overview', component: OrderOverviewComponent },
  { path: 'current-orders-overview', component: CurrentOrdersOverviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: '', redirectTo: 'dashboard-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
