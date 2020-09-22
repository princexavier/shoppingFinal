import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCardService } from '../shopping-card.service';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  @Input('total') total;

  @ViewChild(ProductQuantityComponent) productQuantity: ProductQuantityComponent
  allItemsCount: number = 0;
  productsKeys: any = [];
  items: any;
  totalAmount: number = 0;
  constructor(private cartService: ShoppingCardService) { }

  async ngOnInit() {
    this.getTotal()

  }
  async getTotal(){
    let cart = (await this.cartService.getCart()).snapshotChanges();
    cart.subscribe(items => {
      this.allItemsCount = 0;
      this.shoppingCart = items.payload.toJSON();

      if(this.shoppingCart['items']){
        this.productsKeys = Object.keys(this.shoppingCart['items']);
        this.items = this.shoppingCart['items'];
        for (let product in this.shoppingCart['items']) {
          this.allItemsCount += this.shoppingCart['items'][product]['quantity'];
          this.shoppingCart['items'][product]['product']['key'] = product;
          this.totalAmount += this.shoppingCart['items'][product]['quantity'] * this.shoppingCart['items'][product]['product']['price']
        }
      }
    
    })
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item;
    this.shoppingCart['items'] ?
      item = this.shoppingCart['items'][this.product.key] : item = item;
    return item ? item.quantity : 0;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  clearCart(){
    this.cartService.clearCart();
    this.items=null;
    this.totalAmount=0;
  }
}
