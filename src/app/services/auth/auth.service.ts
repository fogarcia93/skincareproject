import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from 'src/app/models/Permission';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: User;
  public permissionCollection: AngularFirestoreCollection<Permission>;
  public permissions: Observable<Permission[]>;

  constructor(private AFauth: AngularFireAuth,
              private router: Router,
              private db : AngularFirestore) { 

                this.permissionCollection = db.collection<Permission>('roles');
                this.permissions = this.permissionCollection.snapshotChanges().pipe(map(
                  actions => {
                    return actions.map(x=>{
                      const data = x.payload.doc.data();
                      const id = x.payload.doc.id;
                      return {id, ...data }
                    });
                  }
                ));
              }

  Login(email: string, password:string){
   return new Promise((resolve, rejected) =>{
    this.AFauth.signInWithEmailAndPassword(email,password).then(user => {
      resolve(user)
      console.log(user.user.uid);
     localStorage.setItem('uid',user.user.uid);
    }).catch(err => rejected(err))
   })
  }

  logout(){
    this.AFauth.signOut().then(() =>{
      this.router.navigate(['/login'])
      localStorage.clear();
    })
  }

  register(email: string, password:string, name: string, profile: string){
    return new Promise((resolve, reject) =>{
      this.AFauth.createUserWithEmailAndPassword(email,password).then(res =>{
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          Name: name,
          uid: uid,
          Email: email,
          Profile: profile
        })
        resolve(res)
      }).catch(err => reject(err))
    })
    
  }
  getUserPermitions(){
    return this.permissions;
  }

  estadoSesion(){
   return  this.AFauth.authState;
  }

}
