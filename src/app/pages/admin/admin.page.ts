import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  products: Product[]=[]
  constructor(
    private router: Router,
    private _productsService: ProductsService,
  ) { }

  ngOnInit() {
    this._productsService.getColection('products/').subscribe((res:any)=>{
      this.products = res;
      console.log(this.products);
    })
  }

   addProduct(){
    this.router.navigate(['/add-product']);
  }

}
