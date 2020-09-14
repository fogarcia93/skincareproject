import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { PurchaseOrdersPage } from '../purchase-orders/purchase-orders.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  products: Array<any> = [];
  totalCost: number = 0;

  constructor(
    public nav: NavController,
    public pop: PopoverController,
    ) {
    if (localStorage.getItem('carts')) {
      this.products = JSON.parse(localStorage.getItem('carts'));
    }


    setInterval(() => {
      if (localStorage.getItem('carts')) {
        this.products = JSON.parse(localStorage.getItem('carts'));
      }
    }, 100);
  }

  ngOnInit() {
  }

  viewProduct(id, name, picture, price, category, company) {
    sessionStorage.setItem("productId", id);
    sessionStorage.setItem("productName", name);
    sessionStorage.setItem("productPicture", picture);
    sessionStorage.setItem("productPrice", price);
    sessionStorage.setItem("productCategory", category);
    sessionStorage.setItem("productCompany", company);
    this.nav.navigateForward('/product/' + id);
  }

  goTo(){
    this.nav.navigateRoot('/');
  }

 async purchaseOrder(){
   const popover = await  this.pop.create({
     component: PurchaseOrdersPage
   });
   popover.present();
  }

}
