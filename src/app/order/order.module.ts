import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewOrderComponent } from './component/create-new-order/create-new-order.component';
import { OrderOverviewComponent } from './component/order-overview/order-overview.component';
import { Routes } from '@angular/router';
import { CurrentOrdersOverviewComponent } from './component/current-orders-overview/current-orders-overview.component';

const routes: Routes = [
  { path: '', component: OrderOverviewComponent },
  { path: '', component: CurrentOrdersOverviewComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
