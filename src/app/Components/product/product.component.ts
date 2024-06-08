// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import {  RouterLink, RouterModule } from '@angular/router';
// import { WishlistService } from '../../Services/wishlist.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [HttpClientModule,RouterLink],
//   providers: [WishlistService],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css'
// })
// export class ProductComponent implements OnInit {
  
//   @Input() product: any;
//   @Output() addToFavoritesEvent: EventEmitter<any> = new EventEmitter();

//   wishlistCount: number = 0;
//   wishlistitems:any[]=[]
  
//   constructor(private wishList: WishlistService, private http:HttpClient) {}

//   ngOnInit(): void {
//     // Your initialization logic goes here
//     this.getWishlistCount(); // Call the method to initialize wishlist count
//   }

//   addToFavorites(event: Event, product: any) {
//     event.preventDefault(); 
//     this.wishList.createProduct(product).subscribe(
//       (response) => {
//         console.log('Product added to favorites:', response);
//         this.getWishlistCount(); // Update wishlist count after adding product
//         this.addToFavoritesEvent.emit(); // Emit event when product is added to favorites
//       },
//       (error) => {
//         console.error('Error adding product to wishlist:', error);
//       }
//     )
//     this.addToFavoritesEvent.emit(product);
//   }

//   removeFromWishlist(productId: any) {
//     this.wishList.deleteProduct(productId).subscribe(
//       () => {
//         console.log('Product removed from wishlist');
//         this.getWishlistCount(); // Update wishlist count after removing product
//       },
//       (error) => {
//         console.error('Error removing product from wishlist:', error);
//       }
//     );
//     window.location.reload()
//   }


// // removeItem(index: number): void {
// //     // Remove the item from the cart array
// //     const removedItem = this.cartItems.splice(index, 1)[0];

// //     // Send a request to the server to update the JSON file
// //     this.http.delete<any>('http://localhost:2000/cart/' + removedItem.id)
// //       .subscribe(
// //         (response) => {
// //           console.log('Item removed from the cart:', response);
// //           // Optionally, you can handle success behavior here
// //         },
// //         (error) => {
// //           console.error('Error removing item from the cart:', error);
// //           // Optionally, you can handle error behavior here
// //           // You may want to add the removed item back to the cart array if the server operation fails
// //           this.cartItems.splice(index, 0, removedItem);
// //         }
// //       );
// //   }




//   getWishlistCount() {
//     this.wishList.getLength().subscribe(
//       (count) => {
//         this.wishlistCount = count;
//       },
//       (error) => {
//         console.error('Error getting wishlist count:', error);
//       }
//     );
//   }
//   addToCart(product: any): void {
//     if (!product.quantity) {
//       product.quantity = 1;
//     }
  
//     Swal.fire({
//       title: "Do you want to save the changes?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: `Don't save`
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.http.post<any>('http://localhost:2000/cart', product)
//           .subscribe(
//             (response: any) => {
//               console.log('Item added to cart:', response);
//               Swal.fire("Saved!", "", "success");
//             },
//             (error: any) => {
//               console.error('Error adding item to cart:', error);
//               Swal.fire("Error", "There was an error adding the item to the cart", "error");
//             }
//           );
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   }
// }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { WishlistService } from '../../Services/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  providers: [WishlistService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Output() addToFavoritesEvent: EventEmitter<any> = new EventEmitter();

  wishlistCount: number = 0;
  wishlistItems: any[] = [];

  constructor(private wishList: WishlistService, private http: HttpClient) {}

  ngOnInit(): void {
    // Your initialization logic goes here
    this.getWishlistCount(); // Call the method to initialize wishlist count
  }

  addToFavorites(event: Event, product: any) {
    event.preventDefault();
    this.wishList.createProduct(product).subscribe(
      (response) => {
        console.log('Product added to favorites:', response);
        this.getWishlistCount(); // Update wishlist count after adding product
        this.addToFavoritesEvent.emit(); // Emit event when product is added to favorites
      },
      (error) => {
        console.error('Error adding product to wishlist:', error);
      }
    );
    this.addToFavoritesEvent.emit(product);
  }

  removeFromWishlist(productId: any) {
    this.wishList.deleteProduct(productId).subscribe(
      () => {
        console.log('Product removed from wishlist');
        this.getWishlistCount(); // Update wishlist count after removing product
      },
      (error) => {
        console.error('Error removing product from wishlist:', error);
      }
    );
    window.location.reload();
  }

  getWishlistCount() {
    this.wishList.getLength().subscribe(
      (count) => {
        this.wishlistCount = count;
      },
      (error) => {
        console.error('Error getting wishlist count:', error);
      }
    );
  }

  addToCart(event: Event, product: any): void {
    event.preventDefault();

    if (!product.quantity) {
      product.quantity = 1;
    }

    Swal.fire({
      title: "Do you want to add this product to cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post<any>('http://localhost:2000/cart', product)
          .subscribe(
            (response: any) => {
              console.log('Item added to cart:', response);
              Swal.fire("Saved!", "", "success");
            },
            (error: any) => {
              console.error('Error adding item to cart:', error);
              Swal.fire("Error", "There was an error adding the item to the cart", "error");
            }
          );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
