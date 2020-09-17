import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(
    private authService: AuthService, 
    private router: Router,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {}

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
          this.router.navigate(['/cart']);
        }
      }

    ]
    });
    await actionSheet.present();
  }
}
