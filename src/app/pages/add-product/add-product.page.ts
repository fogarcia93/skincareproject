import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  product: Product
  constructor(
    private _router: Router,
    private _productsService: ProductsService,
  ) {
    this.product = new Product();
   }

  ngOnInit() {
  }

  guardarProducto(){
    const data = {
    ProductName: this.product.ProductName,
    Description: this.product.Description,
    Price: this.product.Price,
    Category: this.product.Category,
    Company: this.product.Company,
    SkinType: this.product.SkinType,
    Quality: this.product.Quality

    };
    this._productsService.createDoc(data,'products/',this._productsService.getId());
  }
}
