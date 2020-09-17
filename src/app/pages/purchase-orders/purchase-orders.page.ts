import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchaseOrders/purchase-orders.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.page.html',
  styleUrls: ['./purchase-orders.page.scss'],
})
export class PurchaseOrdersPage implements OnInit {

  carts: Array<any> = [];
  uid: string
  totalCost: number = 0;
  PurchaseOrder: PurchaseOrder ={
    id: '',
    detail: []
  };

  constructor(
    private popOver: PopoverController,
    public alertControl: AlertController,
    public poService: PurchaseOrdersService,
    public nav: NavController,

    ) {
    this.uid = localStorage.getItem('uid');
    this.carts = JSON.parse(localStorage.getItem('carts'));
     this.carts.forEach(cart => {
     let conversion = parseInt(cart.price);
     this.totalCost = conversion + this.totalCost;
    });
   
    
  }

  ngOnInit() {
   
  }


 async createPurchaseOrder(){
    const alertDialog = await this.alertControl.create({
      header: 'Orden de Compra',
      message: '¿Estas seguro de tu pedido?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Si',
          handler: () => {

            let uid = localStorage.getItem('uid');
            this.PurchaseOrder.id = uid;
            this.PurchaseOrder.detail = this.carts;
            this.poService.saveOrder(this.PurchaseOrder).then(()=>{
              localStorage.clear();
              this.nav.pop();
            })
          }
        }
      ]
    });

    alertDialog.present();
  }

}
