import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitLogin(){
   this.authService.Login(this.email, this.password).then( res => {
     this.router.navigate(['/home']);
   }).catch(err => alert('no existe el usuario'))
  }

}
