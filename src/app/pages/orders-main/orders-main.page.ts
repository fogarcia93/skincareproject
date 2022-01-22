import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchaseOrders/purchase-orders.service';

@Component({
  selector: 'app-orders-main',
  templateUrl: './orders-main.page.html',
  styleUrls: ['./orders-main.page.scss'],
})
export class OrdersMainPage implements OnInit {

  purchaseOrders: PurchaseOrder[] = new Array<PurchaseOrder>();
  purchaseOrders2: PurchaseOrder[] = new Array<PurchaseOrder>();
  purchaseOrders3: PurchaseOrder = new PurchaseOrder();
  constructor(public purchaseOrdersService: PurchaseOrdersService, public router: Router) { }

  ngOnInit() {
    this.purchaseOrdersService.getColection('orders/').subscribe((res:any) => {
      this.purchaseOrders = res;
    });
  }


  ver(){
    this.router.navigate(['/invoice']);
  }
}
