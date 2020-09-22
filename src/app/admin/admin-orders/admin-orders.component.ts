import { OrderService } from './../../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders:any
  constructor(private orderService :OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().snapshotChanges().subscribe(data=>{
      data.forEach(e=>{
        this.orders =  e.payload.toJSON();
      })
    });
  }

}
