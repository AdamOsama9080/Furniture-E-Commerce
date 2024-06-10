// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../../Services/product.service';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-productdetails',
//   standalone: true,
//   imports: [CommonModule,HttpClientModule],
//   providers: [ProductService],
//   templateUrl: './productsdetails.component.html',
//   styleUrl: './productsdetails.component.css'
// })
// export class ProductsdetailsComponent implements OnInit {
//   id: any;
//   product: any;
//   isShown: boolean = false;

//   constructor(private myActivated: ActivatedRoute, private prodsrv: ProductService) { }

//   ngOnInit(): void {
//     this.id = this.myActivated.snapshot.params["id"];
//     console.log(this.id);

//     this.prodsrv.getProduct(this.id).subscribe({
//       next: (data) => {
//         this.product = data;
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//   }

//   // show() {
//   //   this.isShown = true;
//   // }

//   // hide() {
//   //   this.isShown = false;
//   // }
//   // toggleLinediv() {
//   //   const linediv = document.querySelector('.linediv');
//   //   if (linediv) {
//   //     linediv.classList.toggle('d-none');
//   //   }
//   // }
// }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/Services/product.service';
// import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-productdetails',
  standalone: true,
  
  imports: [FormsModule,CommonModule,HttpClientModule],
  providers:[ProductService],
  templateUrl: './productsdetails.component.html',
  styleUrl: './productsdetails.component.css'
})
export class ProductdetailsComponent implements OnInit{
  products: any
  productId: number | null = null;
 
  @Input() product: any;

  constructor(private ProductService: ProductService , private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.productId=activatedRoute.snapshot.params["id"];
   }
 


  ngOnInit() {
    if (this.productId) {
      this.ProductService.getProduct(this.productId).subscribe(
        product => this.products = product, 
    
      );
    } else {
       console.error('Error fetching product:')
    }
  }

  
  

  quantity: number = 1; 


  increaseQuantity() {
      this.quantity++;
  }


  decreaseQuantity() {
      if (this.quantity > 1) {
          this.quantity--;
      }
  }


 
  selectedTab: string = 'description'; // Initial tab selection

  // Function to show the description tab
  showDescription() {
      this.selectedTab = 'description';
  }

  // Function to show the additional information tab
  showAdditionalInfo() {
      this.selectedTab = 'additionalInfo';
  }

  // Function to show the review tab
  showReview() {
      this.selectedTab = 'review';
  }
  currentRating: number = 0;

  rate(rating: number) {
    this.currentRating = rating;
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
        this.http.post<any>('https://json-server-furniture-project.onrender.com/cart', product)
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