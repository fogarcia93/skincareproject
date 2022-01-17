import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';


@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private productCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  constructor(
   public db: AngularFirestore) { 
       this.productCollection = db.collection<Product>('products');
       this.products = this.productCollection.snapshotChanges().pipe(map(
         actions => {
           return actions.map(x=>{
             const data = x.payload.doc.data();
             const id = x.payload.doc.id;
             return {id, ...data }
           });
         }
       ));
    }

    getProducts(){
      return this.products;
    }

    getProduct(id: string, path: string){
      const query = this.db.collection(path)
      return query.doc(id).valueChanges();
    }

    updateProduct(product: Product, id: string){
      return this.productCollection.doc(id).update(product);
    }


    saveProduct(product: Product){
      return this.productCollection.add(product);
    }

    removeProduct(id: string){
      return this.productCollection.doc(id).delete();
    }

    getColection(path: string){
      const query = this.db.collection(path);
      return query.valueChanges();
    }
}
