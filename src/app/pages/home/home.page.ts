import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products: Product[];
  
  constructor(
   
    private _productsService: ProductsService
    ) { 
      this.products = [];
    }

    ngOnInit(): void {  
      this._productsService.getProducts().subscribe(response => {
        this.products = response;
      });
    }

    viewProduct(id: string){
      console.log(id);
    }
}
