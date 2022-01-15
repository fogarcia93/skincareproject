import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: Product[];
  uid: string
  constructor(
    private _router: Router,
    private _productsService: ProductsService,
    private angularFirestore: AngularFirestore
    ) { 
      this.products = [];
      this.uid = localStorage.getItem('uid');
    }

    ngOnInit(): void {  
      this._productsService.getProducts().subscribe(response => {
        this.products = response;
        console.log(response);
      });
      console.log(this.uid);
    }

    viewProduct(id, name, picture, price, category, company, skinType){
      sessionStorage.setItem("productId", id);
      sessionStorage.setItem("productName", name);
      sessionStorage.setItem("productPicture", picture);
      sessionStorage.setItem("productPrice", price);
      sessionStorage.setItem("productCategory", category);
      sessionStorage.setItem("productCompany", company);
      sessionStorage.setItem("productSkinType", skinType);
      this._router.navigate(['/product/', id]);
    }

    buscar(event){
      const filter = this.products.filter(res => res.SkinType === event.detail.value);
      if(filter.length===0 ){
        this._productsService.getProducts().subscribe(response => {
          this.products = response;
        });
      }else{
        this.products = filter;
      }     
    
    }
}
