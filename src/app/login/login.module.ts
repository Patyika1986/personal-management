import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { RegistComponent } from './component/regist/regist.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', component: RegistComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
