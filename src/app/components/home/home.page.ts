import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthService, 
    private router: Router,
    public actionSheetController: ActionSheetController
    ) { }

  onLogout(){
    this.authService.logout();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opcions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Cerrar Session',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }
}
