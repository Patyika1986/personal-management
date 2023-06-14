import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/component/dashboard-overview/dashboard-overview.component';
import { PersonalOverviewComponent } from './personal-management/component/personal-overview/personal-overview.component';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard-overview/dashboard-overview.module').then(dasboard => dasboard.DashboardOverviewModule)},
  { path: 'personal', loadChildren: () => import('./personal-management/personal-management.module').then(personal => personal.PersonalManagementModule)},
  { path: 'personal-module', loadChildren: () => import('./service/personal/personal.module').then(personal => personal.PersonalModule)},
  { path: 'dashboard-overview', component: DashboardOverviewComponent },
  { path: 'personal-overview', component: PersonalOverviewComponent },
  { path: '', redirectTo: 'dashboard-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
