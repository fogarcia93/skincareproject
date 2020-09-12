import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  productId: string;
  productName: string;
  productPicture: string;
  productPrice: string;
  productCategory: string;
  cartText: string;
  segment: string = "relatedProducts";

  related: Array<any> = [];
  from: Array<any> = [];
  constructor(
    public afs: AngularFirestore,
    public nav: NavController

  ) {
    this.productId = sessionStorage.getItem("productId");
    this.productName = sessionStorage.getItem("productName");
    this.productPicture = sessionStorage.getItem("productPicture");
    this.productPrice = sessionStorage.getItem("productPrice");
    this.productCategory = sessionStorage.getItem("productCategory");

    if (localStorage.getItem("carts")) {
      let carts: Array<any> = JSON.parse(localStorage.getItem("carts"));


      let index = carts.findIndex(x => x.id == this.productId)
      if (index == -1) {
        this.cartText = 'Agg al Carrito'
      } else {
        this.cartText = 'Agregado'
      }
    } else {
      this.cartText = 'Agg Carrito'
    }

    const query = this.afs.
              collection('products', ref => ref.where('Category', '==', this.productCategory))
              .snapshotChanges();

    query.subscribe(res=>{
      res.map(x=>{
        this.related.push(x.payload.doc.data());
      })
    })



  }

  ngOnInit() {
    console.log(this.related);

  }

  viewProduct(id, name, picture, price, category) {
    sessionStorage.setItem("productId", id);
    sessionStorage.setItem("productName", name);
    sessionStorage.setItem("productPicture", picture);
    sessionStorage.setItem("productPrice", price);
    sessionStorage.setItem("productCategory", category);
    this.nav.navigateForward('/product/');
  }

  addToCart() {

  }

  changeSeg() {

  }
}
