import { Observable } from 'rxjs';
import { ShoppingCart } from './../models/shoppingcart';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCardService } from '../shopping-card.service';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser;
  allItemsCount: number = 0;
  shoppingCartItemCount: number = 0
  cart$: Observable<ShoppingCart>

  constructor(public authService: AuthService, private cartService: ShoppingCardService,
    private route: Router) {
    this.appUser = JSON.parse(localStorage.getItem('appUser'));

  }

  async ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('appUser'));
    let cart$ = (await this.cartService.getCart()).snapshotChanges();
    cart$.subscribe(items => {
      this.shoppingCartItemCount = 0;
      this.allItemsCount = 0;
      let results = items.payload.toJSON();
      const resultItem = <ShoppingCart>results;
      if ('totalItemsCount' in  resultItem) {
        this.shoppingCartItemCount = resultItem.totalItemsCount;

      }
      for (let productId in resultItem.items) {
        this.allItemsCount += resultItem.items[productId].quantity;
      }
      //   this.allItemsCount=0;

      //  let results =  items.payload.toJSON();

      // if(results){
      //   for(let product in results['items']){
      //     this.allItemsCount+=results['items'][product]['quantity'];
      //  }
      // }

      // for(let productId in resultItem.items){
      //   this.shoppingCartItemCount+= resultItem.items[productId].quantity
      // }
    });

  }

  logout() {
    localStorage.clear();
    this.ngOnInit()
    this.authService.logOut();
    this.route.navigate(['/']);
  }

}
