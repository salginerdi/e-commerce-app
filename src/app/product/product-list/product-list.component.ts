import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ProductService} from "../product.service";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatCard,
  MatCardContent,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {Product} from "../../models/product";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCard,
    MatButtonModule,
    MatCardModule,
    CurrencyPipe,
    FlexModule,
    NgOptimizedImage,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  products = this.productService.filteredProduct;
  cart = this.cartService.cart;
  snackBar = inject(MatSnackBar)
  sortOrder = this.productService.sortOrder


  ngOnInit(): void {
    this.productService.getProducts().subscribe()
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Product added to cart!", "", {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    })
  }

  applyFilter(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productService.setSearchTerm(searchTerm);
  }

  sortProducts(sortValue: string) {
    this.sortOrder.set(sortValue)
    if(this.sortOrder() === 'priceLowHigh'){
      this.products().sort((a,b) => a.price - b.price)
    }else if(this.sortOrder() === 'priceHighLow') {
      this.products().sort((a,b) => b.price - a.price)
    }
  }
}


