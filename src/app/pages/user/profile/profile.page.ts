import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any
  cart: Array<any> = [];
  uid: string
  constructor(public nav: NavController, private authService: AuthService,
    private _productsService: ProductsService,) { 
      this.user = new Object();
      this.uid = localStorage.getItem('uid');
    if (localStorage.getItem('carts')) {
      this.cart = JSON.parse(localStorage.getItem('carts'));
    }

    setInterval(() => {
      if (localStorage.getItem('carts')) {
        this.cart = JSON.parse(localStorage.getItem('carts'));
      }
    }, 500);
  }

  ngOnInit() {
    this._productsService.getDocument(this.uid, 'users/').subscribe(res => {
      this.user = res
      console.log(this.user);
    });
      
  }

  viewCart(){
    this.nav.navigateForward('/cart');
  }

  orders(){
    this.nav.navigateForward('/orders-main');
  }

}
