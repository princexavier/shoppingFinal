import { UserService } from './../user.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shoppingcart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingCardService } from '../shopping-card.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  shipping: {};
  cart: any;
  subscription: Subscription;
  userId: string = "";
  userName: string = "";

  constructor(private cartService: ShoppingCardService, private orderService: OrderService,
    private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    let cart = await this.cartService.getCart();
    cart.snapshotChanges().subscribe(data => {
      this.cart = data.payload.toJSON();
    });

    this.authService.user$.subscribe(data => {
      if (data) {
        this.userId = data.uid;
        this.userName = data.displayName;
      }

    })
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
  async placeOrder(formData: NgForm) {
    let products: any = [];
    products = Object.keys(this.cart.items);

    let itemsInCart = {};
    let itemsCartSelect = {};


    products.forEach((element, index) => {
      itemsInCart['quantity'] = this.cart.items[element]['quantity'];
      itemsInCart['product'] = {
        title: this.cart.items[element]['product']['title'],
        price: this.cart.items[element]['product']['price'],
      }
      itemsCartSelect[index] = itemsInCart;
      itemsInCart = {}


    })

    let order = {
      datePlaced: new Date().getTime(),
      shipping: formData.value,
      items: itemsCartSelect,
      userId: this.userId,
      userName: this.userName
    }

    let key = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', key['key']])
    console.log(key)
  }
}
