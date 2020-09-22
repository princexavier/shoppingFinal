import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shoppingcart';
import { ShoppingCardService } from '../shopping-card.service';

@Component({
  selector: 'app-shoppingcartsummary',
  templateUrl: './shoppingcartsummary.component.html',
  styleUrls: ['./shoppingcartsummary.component.css']
})
export class ShoppingcartsummaryComponent  implements OnInit{

  @Input("cart") cart:any
  allItemsCount: number;
  shoppingCartItemCount: number;
  productsKey:any=[];
  results: Object;
  products: any=[];
  totalAmount: number=0;
  constructor(private cartService :ShoppingCardService) { }

async ngOnInit(){
  this.products=[];
  let cart = await this.cartService.getCart();
    cart.snapshotChanges().subscribe(data => {
      this.shoppingCartItemCount = 0;
      this.allItemsCount = 0;
      this.results = data.payload.toJSON();
      this.productsKey = Object.keys(this.results['items']);
      const resultItem = <ShoppingCart>this.results;
      if ('totalItemsCount' in  resultItem) {
        this.shoppingCartItemCount = resultItem.totalItemsCount;

      }
      for (let productId in resultItem.items) {
        this.allItemsCount += resultItem.items[productId].quantity;
        let product = {
          title:resultItem.items[productId]['product']['title'],
          quantity : (+resultItem.items[productId]['quantity']),
          price:(+resultItem.items[productId]['product']['price'])
        }
        this.products.push(product);
        this.totalAmount += resultItem['items'][productId]['quantity'] * resultItem['items'][productId]['product']['price']

      }
      this.cart = data.payload.toJSON();
    });

}

}
