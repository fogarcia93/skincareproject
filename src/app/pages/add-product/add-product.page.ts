import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
    private _productsService: ProductsService, private toastController: ToastController, public loadingController: LoadingController
  ) {
    this.product = new Product();
   }

  ngOnInit() {
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere',
      duration: 5000
    });
    await loading.present();
  }
  async guardarProducto(){
    const path = 'productos';
    const name = this.product.ProductName;
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
    this._router.navigate(['/admin']);
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
