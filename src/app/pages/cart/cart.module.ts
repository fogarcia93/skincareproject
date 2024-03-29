import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { ComponentsModule } from 'src/app/components/components/components.module';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ComponentsModule,
    NgxPayPalModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
