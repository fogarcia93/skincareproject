import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: any;
  constructor(
    private authService: AuthService, 
    private router: Router,
    public actionSheetController: ActionSheetController,
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

  onLogout(){
    this.authService.logout();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Cerrar Session',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onLogout();
        }
      },
      {
        text: 'Mi Perfil',
        role: 'destructive',
        icon: 'person-circle-outline',
        handler: () => {
          this.router.navigate(['/profile']);
        }
      },
      {
        text: 'Categorias',
        role: 'destructive',
        icon: 'gift-outline',
        handler: () => {
          this.router.navigate(['/categories']);
        }
      },
      {
        text: 'Carrito',
        role: 'destructive',
        icon: 'cart-outline',
        handler: () => {
          this.router.navigate(['/categories']);
        }
      }

    ]
    });
    await actionSheet.present();
  }
}
