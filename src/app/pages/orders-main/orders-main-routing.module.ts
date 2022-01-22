import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersMainPage } from './orders-main.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersMainPageRoutingModule {}
