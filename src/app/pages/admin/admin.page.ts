import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
declare var html2pdf; 
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

  delete(product: Product){
    this._productsService.deleteDoc(product.id, 'products/');
  }

  descargar(){
    const div = document.getElementById("div1");
    var options = {
      margin:1,
      filename: Date.now().toString()+".pdf"
    }
    html2pdf().from(div).set(options).save();
  }
}
