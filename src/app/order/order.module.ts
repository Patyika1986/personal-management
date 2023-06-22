import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewOrderComponent } from './component/create-new-order/create-new-order.component';
import { OrderOverviewComponent } from './component/order-overview/order-overview.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OrderOverviewComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
