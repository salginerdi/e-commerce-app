import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpClient = inject(HttpClient)
  private apiCartUrl = environment.apiUrl + '/cart'
  private apiCheckoutUrl = environment.apiUrl + '/checkout'
  cart = signal<Product[]>([])

  constructor() {
  }

  addToCart(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiCartUrl, product)
  }

  getCartItems(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiCartUrl).pipe(
      tap((res) => {
          this.cart.set(res)
        }
      )
    )
  }

  clearCart(): Observable<void> {
    return this.httpClient.delete<void>(this.apiCartUrl)
  }

  checkout(products: Product[]): Observable<void> {
    return this.httpClient.post<void>(this.apiCheckoutUrl, products)
  }

}

