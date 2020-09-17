import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchaseOrders/purchase-orders.service';

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
  productCompany: string;
  cartText: string;
  segment: string = "relatedProducts";
  related: Array<any> = [];
  from: Array<any> = [];
  PurchaseOrder: PurchaseOrder ={
    id: '',
    detail: []
  };
  constructor(
    public afs: AngularFirestore,
    public nav: NavController,
    public alertControl: AlertController,
    public poService: PurchaseOrdersService

  ) {
    this.productId = sessionStorage.getItem("productId");
    this.productName = sessionStorage.getItem("productName");
    this.productPicture = sessionStorage.getItem("productPicture");
    this.productPrice = sessionStorage.getItem("productPrice");
    this.productCategory = sessionStorage.getItem("productCategory");
    this.productCompany = sessionStorage.getItem("productCompany");
   

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

    this.afs.collection('products', ref => ref.where('Category', '==', this.productCategory))
      .snapshotChanges()
      .subscribe(res => {
        res.map(x => {
          this.related.push(x.payload.doc.data());
        })
      });
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
    this.nav.navigateForward('/product/');
  }

  addToCart() {
    let carts: Array<any> = [];
    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts'));

      let index = carts.findIndex(x => x.id == this.productId);
      if (index == -1) {
        this.cartText = 'Agregado';
        var product = {
          id: this.productId,
          name: this.productName,
          picture: this.productPicture,
          price: this.productPrice,
          category: this.productCategory,
          company: this.productCompany
        }
        carts.push(product);
      }
      else {
        carts.splice(index, 1);
        this.cartText = 'Agg al Carrito';
      }
    }
    else {
      this.cartText = 'Agregado';
      var product = {
        id: this.productId,
        name: this.productName,
        picture: this.productPicture,
        price: this.productPrice,
        category: this.productCategory,
        company: this.productCompany
      }
      carts.push(product);
    }
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  changeSeg() {
    if (this.segment == 'fromCompany') {
      if (this.from.length == 0) {
        this.afs.collection('products', ref => ref.where('Company', '==', this.productCompany))
          .snapshotChanges()
          .subscribe(res => {
            res.map(x => {
              this.from.push(x.payload.doc.data());
            })
          });
      }
    }
  }

  async buyNow() {
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
            var product = {
              id: this.productId,
              name: this.productName,
              picture: this.productPicture,
              price: this.productPrice,
              category: this.productCategory,
              company: this.productCompany
            }
            let uid = localStorage.getItem('uid');
            this.PurchaseOrder.id = uid;
            this.PurchaseOrder.detail.push(product);
            this.poService.saveOrder(this.PurchaseOrder).then(()=>{
              this.nav.pop();
            })
        
            
          }
        }
      ]

    });

    alertDialog.present();
  }
}
