import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchaseOrders/purchase-orders.service';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal/ngx';

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
    public payPal: PayPal
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
  
  pay() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AYv3JaAkzTZc76I_nBNAivSSPil5Pdqc80kLmewJ051BgHGvwpOPF6YLkkhFOnlyQHLqVg5uxp9Tth5T'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
