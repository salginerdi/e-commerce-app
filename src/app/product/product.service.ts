import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient = inject(HttpClient)
  private apiUrl = environment.apiUrl + '/products'
  sortOrder = signal<string>("")

  product = signal<Product[]>([])
  searchTerm = signal<string>('');
  filteredProduct = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.product().filter(product => product.name.toLowerCase().includes(term));
  });
  constructor() {
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl).pipe(
      tap((res) => {
          this.product.set(res);
        }
      )
    )
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }
}
