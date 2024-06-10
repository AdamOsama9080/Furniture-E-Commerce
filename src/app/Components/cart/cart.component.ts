import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from './cart.service';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img_url: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  @Input() quantity: number = 1;
  shippingCost: number = 0;
  subtotal: number = 0;
  total: number = 0;
  constructor(private http: HttpClient, private cartService: CartService) { }
  // decreaseQuantity(item: CartItem): void {
  //   if (item.quantity > 1) {
  //     item.quantity--;
  //   }
  // }
  ngOnInit(): void {
    this.fetchCartItems();
    this.cartService.total$.subscribe(total => this.total = total);
  }
  fetchCartItems(): void {
    this.http.get<CartItem[]>('https://json-server-furniture-project.onrender.com/cart')
      .subscribe(
        (data: CartItem[]) => {
          this.cartItems = data;
          this.calculateSubtotalAndTotal(); // Calculate subtotal and total
          this.cartService.updateTotal(this.total);
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
  }
  calculateSubtotalAndTotal(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = this.subtotal + this.shippingCost;
    this.cartService.updateTotal(this.total);
  }
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateSubtotalAndTotal();
    }
  }
  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.calculateSubtotalAndTotal();
  }
  removeItem(index: number): void {
    const removedItem = this.cartItems.splice(index, 1)[0];
    this.http.delete<any>('https://json-server-furniture-project.onrender.com/cart/' + removedItem.id)
      .subscribe(
        (response) => {
          console.log('Item removed from the cart:', response);
          this.calculateSubtotalAndTotal();
        },
        (error) => {
          console.error('Error removing item from the cart:', error);
          this.cartItems.splice(index, 0, removedItem);
        }
      );
  }

  updateShippingCost(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.value === 'flat-rate') {
      this.shippingCost = 10;
    } else {
      this.shippingCost = 0;
    }
    this.calculateSubtotalAndTotal();
  }
//   increaseQuantity(item: CartItem): void {
//     item.quantity++;
//   }

//   get subtotal(): number {
//     return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   }

//   get total(): number {
//     return this.subtotal + this.shippingCost;
//   }

//   removeItem(index: number): void {
//     // Remove the item from the cart array
//     const removedItem = this.cartItems.splice(index, 1)[0];

//     // Send a request to the server to update the JSON file
//     this.http.delete<any>('https://json-server-furniture-project.onrender.com/cart/' + removedItem.id)
//       .subscribe(
//         (response) => {
//           console.log('Item removed from the cart:', response);
//           // Optionally, you can handle success behavior here
//         },
//         (error) => {
//           console.error('Error removing item from the cart:', error);
//           // Optionally, you can handle error behavior here
//           // You may want to add the removed item back to the cart array if the server operation fails
//           this.cartItems.splice(index, 0, removedItem);
//         }
//       );
//   }
//   updateShippingCost(event: Event): void {
//     const target = event.target as HTMLInputElement;
//     if (target.value === 'flat-rate') {
//       this.shippingCost = 10;
//     } else {
//       this.shippingCost = 0;
//     }
//   }
}
