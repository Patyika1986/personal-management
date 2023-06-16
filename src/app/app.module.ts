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


@NgModule({
  declarations: [
    AppComponent,
    DashboardOverviewComponent,
    PersonalOverviewComponent,
    SideNavbarComponent,
    CardsComponent,
    BadgeComponent,
    AddPersonalComponent
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
