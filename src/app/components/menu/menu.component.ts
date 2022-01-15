import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  rol: boolean = false
  constructor(private menu: MenuController, private router: Router,
    private authService: AuthService, ) { 
      this.authService.estadoSesion().subscribe(res =>{
        console.log(res);
      })
    }

  ngOnInit() {
    
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
