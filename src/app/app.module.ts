import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardOverviewComponent } from './dashboard-overview/component/dashboard-overview/dashboard-overview.component';
import { PersonalOverviewComponent } from './personal-management/component/personal-overview/personal-overview.component';
import { SideNavbarComponent } from './component/side-navbar/side-navbar.component';
import { CardsComponent } from './dashboard-overview/component/cards/cards.component';
import { BadgeComponent } from './component/badge/badge.component';
import { AddPersonalComponent } from './personal-management/component/add-personal/add-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddNewEmployeesComponent } from './add-new-employees/component/add-new-employees/add-new-employees.component';
import { AddButtonComponent } from './component/add-button/add-button.component';
import { ResetButtonComponent } from './component/reset-button/reset-button.component';
import { CreateNewOrderComponent } from './order/component/create-new-order/create-new-order.component';
import { OrderOverviewComponent } from './order/component/order-overview/order-overview.component';
import { CurrentOrdersOverviewComponent } from './order/component/current-orders-overview/current-orders-overview.component';
import { LoginComponent } from './login/component/login/login.component';
import { EmployeeComponent } from './employee-overview/component/employee/employee.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardOverviewComponent,
    PersonalOverviewComponent,
    SideNavbarComponent,
    CardsComponent,
    BadgeComponent,
    AddPersonalComponent,
    AddNewEmployeesComponent,
    AddButtonComponent,
    ResetButtonComponent,
    OrderOverviewComponent,
    CreateNewOrderComponent,
    CurrentOrdersOverviewComponent,
    LoginComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
