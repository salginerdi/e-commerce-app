import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {CartService} from "../cart.service";
import {MatCard} from "@angular/material/card";
import {MatList, MatListItem, MatListItemTitle} from "@angular/material/list";
import {CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [
    MatCard,
    MatList,
    MatListItem,
    MatListItemTitle,
    CurrencyPipe,
    MatButton,
  ],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent implements OnInit {
  cartService = inject(CartService)
  cart = this.cartService.cart;
  totalPrice: Signal<number> = computed(() => this.getTotalPrice());

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe()
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cart()) {
      total += item.price
    }
    return total;
  }

  clearCart() {
    this.cartService.clearCart().subscribe()
  }

  checkout() {
    this.cartService.checkout(this.cart()).subscribe()
  }
}
