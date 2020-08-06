import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth) { }

  Login(email: string, password:string){
    this.AFauth.signInWithEmailAndPassword(email,password).then(
      res=>{console.log(res)}
    ).catch(err => console.log(err))
  }
}
