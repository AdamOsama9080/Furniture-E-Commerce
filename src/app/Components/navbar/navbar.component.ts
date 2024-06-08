import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../../Services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  providers:[WishlistService],
  imports:[HttpClientModule,RouterLink,RouterLinkActive,CommonModule ,WishlistComponent]
})


export class NavbarComponent implements OnInit {
    total: number = 0;
    favoritesCount: number = 0;
    wishlistLength: number = 0;
  
    constructor(private router: Router, private wishlistService: WishlistService, private cartService: CartService) {}
  
    ngOnInit(): void {
      this.updateWishlistCount(); // Initialize wishlist count
  
      // Subscribe to wishlist length changes in the service
      this.wishlistService.getLength().subscribe(length => {
        this.wishlistLength = length;
      });
  
      this.cartService.total$.subscribe(total => {
        this.total = total;
      });
    }
  
    updateWishlistCount() {
      this.wishlistService.getLength().subscribe(length => {
        this.wishlistLength = length;
      });
    }
  
    addToFavorites() {
      this.favoritesCount++;
      const product = { id: 1 }; // Replace with the actual product data
      this.wishlistService.createProduct(product).subscribe(res => {
        console.log(res);
        this.updateWishlistCount(); // Update wishlist count after adding product
      });
    }
  
    navigateToWishlist() {
      this.router.navigate(['/wishlist']);
    }
  }

