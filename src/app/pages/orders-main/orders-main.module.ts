import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersMainPageRoutingModule } from './orders-main-routing.module';

import { OrdersMainPage } from './orders-main.page';
import { ComponentsModule } from 'src/app/components/components/components.module';
import { HomePageRoutingModule } from '../home/home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersMainPageRoutingModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [OrdersMainPage]
})
export class OrdersMainPageModule {}
