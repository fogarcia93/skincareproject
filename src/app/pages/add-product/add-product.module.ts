import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductPageRoutingModule } from './add-product-routing.module';

import { AddProductPage } from './add-product.page';
import { ComponentsModule } from 'src/app/components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddProductPage]
})
export class AddProductPageModule {}
