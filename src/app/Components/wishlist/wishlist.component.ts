import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  providers: [WishlistService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  constructor(private wishlistService:WishlistService) { }

  

  productss:any;
  wishlistCount: number = 0;
  selectedProduct: any = null;
  isHidden: boolean[] = [];


 

  ngOnInit(): void {
    this.getProducts();
  }

  getLength() {
    this.wishlistService.getLength();
  }

  getProducts() {
    this.wishlistService.getProducts().subscribe(
      (data) => {
        console.log('Received products:', data);
        this.productss = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  isShown: boolean = false;

  getProductDetails(productId: any) {
    // this.isShown=true;
    this.wishlistService.getProduct(productId).subscribe(
      (product: any) => {
        this.selectedProduct = product;
        this.show(); // Show the product details modal
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  deleteProduct(id: any, index: number) {
    this.wishlistService.deleteProduct(id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.productss.splice(index, 1);
        this.toggleLinediv();
      }
    );
  }

  show() {
    this.isShown = true;
  }

  hide() {
    this.isShown = false;
  }
  toggleLinediv() {
    const linediv = document.querySelector('.linediv');
    if (linediv) {
      linediv.classList.toggle('d-none');
    }
  }
}
