import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password:string;
  name: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitRegister(){
    this.auth.register(this.email, this.password,this.name).then(auth => {
      this.router.navigate(['/home'])
    }).catch(err => console.log(err))
  }

}
