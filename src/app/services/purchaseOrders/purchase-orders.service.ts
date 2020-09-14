import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {
  private ordersCollection: AngularFirestoreCollection<PurchaseOrder>;
  private orders: Observable<PurchaseOrder[]>;


  constructor(db: AngularFirestore) { 
    this.ordersCollection = db.collection<PurchaseOrder>('orders');
    this.orders = this.ordersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(x=>{
          const data = x.payload.doc.data();
          const id = x.payload.doc.id;
          return {id, ...data }
        });
      }
    ));
  }


  getOrders(){
    return this.orders;
  }

  saveOrder(order: PurchaseOrder){
    debugger
    return this.ordersCollection.add(order);
  }
}
