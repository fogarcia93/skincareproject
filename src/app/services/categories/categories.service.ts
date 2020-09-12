import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from 'src/app/models/categories';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesCollection: AngularFirestoreCollection<Categories>;
  private categories: Observable<Categories[]>;

  constructor(
    db: AngularFirestore) { 
       this.categoriesCollection = db.collection<Categories>('categories');
       this.categories = this.categoriesCollection.snapshotChanges().pipe(map(
         actions => {
           return actions.map(x=>{
             const data = x.payload.doc.data();
             const id = x.payload.doc.id;
             return {id, ...data }
           });
         }
       ));
    }

    getCategories(){
      return this.categories;
    }
}
