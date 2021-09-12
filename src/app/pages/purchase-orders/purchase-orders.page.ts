import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchaseOrders/purchase-orders.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

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

  public payPalConfig ? : IPayPalConfig;

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
    this.initConfig();
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
  
  private initConfig(): void {
    this.payPalConfig = {
            currency: 'EUR',
            clientId: 'AYv3JaAkzTZc76I_nBNAivSSPil5Pdqc80kLmewJ051BgHGvwpOPF6YLkkhFOnlyQHLqVg5uxp9Tth5T',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                        breakdown: {
                            item_total: {
                                currency_code: 'EUR',
                                value: '9.99'
                            }
                        }
                    },
                    items: [{
                        name: 'Enterprise Subscription',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'EUR',
                            value: '9.99',
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                

            },
            onError: err => {
                console.log('OnError', err);
                
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
              
            },
        };
  }

}
