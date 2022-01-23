import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  product: Product = new Product();
  products: Product[]=[]
  idProduct: string
  constructor(
    activatedRoute: ActivatedRoute,
    private _router: Router,
    private _productsService: ProductsService,
  ) { 
    activatedRoute.params.subscribe(params => {
       this.idProduct = params['id'];
      this._productsService.getColection('products/').subscribe((res:any)=>{
        this.products = res;
         const filter = this.products.find(x => x.id === this.idProduct);
         this.product = filter;
      })
      
  });

  }

  ngOnInit() {
  }

  update(){
    debugger
    const data = {
      id: this.idProduct,
      ProductName: this.product.ProductName,
      Description: this.product.Description,
      Price: this.product.Price,
      Category: this.product.Category,
      Company: this.product.Company,
      SkinType: this.product.SkinType,
      Quality: this.product.Quality,
      Picture: this.product.Picture
      };
      this._productsService.updateDoc(data,'products/',data.id);
      this._router.navigate(['/admin']);
    
  }
  
}
