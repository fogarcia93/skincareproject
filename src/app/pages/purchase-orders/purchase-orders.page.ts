import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.page.html',
  styleUrls: ['./purchase-orders.page.scss'],
})
export class PurchaseOrdersPage implements OnInit {

  carts: Array<any> = [];
  uid: string
  totalCost: number = 0;

  constructor(private popOver: PopoverController) {
    this.uid = localStorage.getItem('uid');
    this.carts = JSON.parse(localStorage.getItem('carts'));

     this.carts.forEach(cart => {
     let conversion = parseInt(cart.price);
     this.totalCost = conversion + this.totalCost;
    });
   
    
  }

  ngOnInit() {
   
  }

}
