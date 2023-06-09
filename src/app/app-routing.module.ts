import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login/login.component';
import { RegistComponent } from './login/component/regist/regist.component';

const routes: Routes = [
  { path: 'login_module', loadChildren: () => import('./login/login.module').then(login => login.LoginModule) },
  { path: 'login', component: LoginComponent },
  { path: '',redirectTo: 'login', pathMatch: 'full' },
  { path: 'regist', component: RegistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
