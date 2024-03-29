import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoicePageRoutingModule } from './invoice-routing.module';

import { InvoicePage } from './invoice.page';
import { ComponentsModule } from 'src/app/components/components/components.module';
import { HomePageRoutingModule } from '../home/home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicePageRoutingModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [InvoicePage]
})
export class InvoicePageModule {}
