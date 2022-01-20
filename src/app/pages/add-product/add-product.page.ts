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
  imagen: string = ''
  newFile: string = ''
  constructor(
    private _router: Router,
    private _productsService: ProductsService,
  ) {
    this.product = new Product();
   }

  ngOnInit() {
  }

  async guardarProducto(){
    const path = 'productos';
    const name = 'prueba';
    const res = await this._productsService.subirFoto(this.newFile, path, name);
    this.product.Picture = res;
 
    const data = {
    id: this._productsService.getId(),
    ProductName: this.product.ProductName,
    Description: this.product.Description,
    Price: this.product.Price,
    Category: this.product.Category,
    Company: this.product.Company,
    SkinType: this.product.SkinType,
    Quality: this.product.Quality,
    Picture: this.product.Picture
    };
    this._productsService.createDoc(data,'products/',data.id);
  }

  async Cargar(event:any){
   if(event.target.files && event.target.files[0]){
     this.newFile = event.target.files[0];
     const reader = new FileReader();
     reader.onload = ((image) =>{
       this.imagen = image.target.result as string;
     });
     reader.readAsDataURL(event.target.files[0])
   } 
  }
}
