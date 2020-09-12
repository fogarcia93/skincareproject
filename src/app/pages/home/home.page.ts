import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: Product[];
  
  constructor(
    private _router: Router,
    private _productsService: ProductsService
    ) { 
      this.products = [];
    }

    ngOnInit(): void {  
      this._productsService.getProducts().subscribe(response => {
        this.products = response;
      });
    }

    viewProduct(id, name, picture, price, category){
      sessionStorage.setItem("productId", id);
      sessionStorage.setItem("productName", name);
      sessionStorage.setItem("productPicture", picture);
      sessionStorage.setItem("productPrice", price);
      sessionStorage.setItem("productCategory", category);
      this._router.navigate(['/product/', id]);
    }
}
