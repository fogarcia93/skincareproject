import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: any
  isAdmin: boolean = false
  uid: string
  constructor(private menu: MenuController, private router: Router,
    private authService: AuthService,
    private _productsService: ProductsService, ) { 
      this.uid = localStorage.getItem('uid');
     
    }

  ngOnInit(): void {
    this._productsService.getProduct(this.uid,'users/').subscribe(_res => {
     this.user = _res;
     if (this.user.Profile==='Admin') {
       this.isAdmin= true;
     }
    })
  }

  CerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.menu.close();
  }

  Perfil(){
    this.router.navigate(['/profile']);
    this.menu.close();
  }

  Categorias(){
    this.router.navigate(['/categories']);
    this.menu.close();
  }
  Carrito(){
    this.router.navigate(['/cart']);
    this.menu.close();
  }

  Admin(){
    this.router.navigate(['/admin']);
    this.menu.close();
  }
}
