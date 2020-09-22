import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCardService } from './shopping-card.service';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,private cartService :ShoppingCardService) { }
 async storeOrder(order){
    let result=await this.db.list('/orders').push(order);
    this.cartService.clearCart();
  return result;
  }

  getOrders(){
    return this.db.list('/orders');
  }

  // getOrdeByUser(userId:string){
  //   return this.db.list('/orders').
  // }
}
