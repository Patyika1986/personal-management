import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview/component/dashboard-overview/dashboard-overview.component';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard-overview/dashboard-overview.module').then(dasboard => dasboard.DashboardOverviewModule)},
  { path: 'dashboard-overview', component: DashboardOverviewComponent },
  { path: '', redirectTo: 'dashboard-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
