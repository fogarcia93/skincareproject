import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    public alertControl: AlertController
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


  async delete(product: Product){
    const alertDialog = await this.alertControl.create({
      header: 'Eliminar Producto',
      message: '¿Estas seguro de eliminar e item?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Si',
          handler: () => {

            this._productsService.deleteDoc(product.id, 'products/');
          }
        }
      ]
    });

    alertDialog.present();
  }

  descargar(){
    const div = document.getElementById("div1");
    var options = {
      margin:1,
      filename: Date.now().toString()+".pdf"
    }
    html2pdf().from(div).set(options).save();
  }


  edit(product: Product){
    this.router.navigate(['/edit/editproduct', product.id]);
  }
}
