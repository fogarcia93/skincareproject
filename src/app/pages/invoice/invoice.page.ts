import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from 'src/app/models/PurchaseOrder';
import { PurchaseOrdersService } from 'src/app/services/purchaseOrders/purchase-orders.service';
declare var html2pdf; 
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  purchaseOrders: PurchaseOrder[] = new Array<PurchaseOrder>();
  purchaseOrders2: PurchaseOrder[] = new Array<PurchaseOrder>();
  purchaseOrders3: PurchaseOrder = new PurchaseOrder();
  total: any;
  constructor(public purchaseOrdersService: PurchaseOrdersService) { }

  ngOnInit() {
    let numeros = [];
    this.purchaseOrdersService.getColection('orders/').subscribe((res:any) => {
      this.purchaseOrders = res
      const filter = this.purchaseOrders.filter(x => x.id ==='AtjvR7lyFnQbGUkXgC9YAmBTeNP2');
      this.purchaseOrders3 = filter[0]
      
      this.purchaseOrders3.detail.forEach(e => {
   
         const sub = (e.Price * e.Quality)
        numeros.push(sub);
      });
      this.total = numeros.reduce((a, b) => a + b, 0);
      console.log(this.total);
    })
  }

  descargar(){
    const div = document.getElementById("div1");
    var options = {
      margin:1,
      filename: Date.now().toString()+".pdf"
    }
    html2pdf().from(div).set(options).save();
  }
}
