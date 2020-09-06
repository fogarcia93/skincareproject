import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any;
  constructor(
   
    private productsService: ProductsService
    ) { 
      this.products = [];
    }

    ngOnInit(): void {
      this.productsService.getProducts().subscribe(response=> {
        response.map(r=>{
          this.products.push(r.payload.doc.data());
          console.log(this.products);
        })
      });  
    }
}
