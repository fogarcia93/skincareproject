import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password:string;
  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

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
  onSubmitLogin(){
   this.authService.Login(this.email, this.password).then( res => {
     this.router.navigate(['/home']);
     this.presentToast('Bienvenido Fredy');
   }).catch(err => {
     this.presentToast('Correo Electronico no registrado, favor crear nuevo perfil');
   })
  }

}
