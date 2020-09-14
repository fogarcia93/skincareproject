import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cart: Array<any> = [];

  constructor(public nav: NavController) { 
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
  }

  viewCart(){
    this.nav.navigateForward('/cart');
  }
}
