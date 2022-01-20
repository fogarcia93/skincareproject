import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { AngularFireStorage } from '@angular/fire/storage';



@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private productCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  constructor(
    public db: AngularFirestore, public storage: AngularFireStorage) {

    this.productCollection = db.collection<Product>('products');
    this.products = this.productCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(x => {
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return { id, ...data }
        });
      }
    ));
  }

  createDoc(data: any, path: string, id: string) {
    const document = this.db.collection(path);
    return document.doc(id).set(data);
  }

  getDocument(id: string, path: string) {
    const document = this.db.collection(path)
    return document.doc(id).valueChanges();
  }

  deleteDoc(id: string, path: string) {
    const document = this.db.collection(path)
    return document.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const document = this.db.collection(path);
    return document.doc(id).update(data);
  }

  getColection(path: string) {
    const query = this.db.collection(path);
    return query.valueChanges();
  }
  getId() {
    return this.db.createId();
  }

  subirFoto(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {

      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL =  res;
            resolve(downloadURL);
            return;
          })
        })
      ).subscribe();
    });
  }
}
