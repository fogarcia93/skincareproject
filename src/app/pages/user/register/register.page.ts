import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;
  selected: string;
  options = ['Usuario', 'Tienda'];
  @Output('statusSelectedChange') statusSelectedChange: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthService, private router: Router, private toastController: ToastController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.user = new User();
  }
   async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }

  onSubmitRegister(){
    this.presentLoading();
    if(this.selected===undefined){
      return this.presentToast('Debe selecionar un tipo de usuario');
    }
    this.auth.register(this.user.Email, this.user.Password,this.user.Name, this.user.Profile).then(auth => {
      this.router.navigate(['/home'])
    }).catch(err => {
      console.log(err)
      this.presentToast('La Direccion de correo ya fue registrada por favor ingresar una nueva direccion de correo');
    })
  }

  selectedChange(event: CustomEvent){
    this.selected = event.detail.value;
    this.user.Profile = event.detail.value;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por Favor Espere',
      duration: 5000
    });
    await loading.present();

  }

}
