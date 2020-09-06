import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(
    private router: Router, 
    private db: AngularFirestore) { }

    getProducts(){
     return this.db.collection('products').snapshotChanges();
    }
}
