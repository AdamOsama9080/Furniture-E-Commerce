import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import wow from 'wowjs/dist/wow.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SliderComponent,NavbarComponent,CommonModule,HttpClientModule,ProductComponent],
// providers: [ProductService],
  providers:[ProductService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit  {
  favoritesCount: number = 0;
  favorites: any[] = [];

  constructor(private produvtService:ProductService){}
  allProducts:any=[]
  filteredProducts: any[] = [];

  ngOnInit(): void {
    this.produvtService.getProducts().subscribe({
      next:(data)=>{
        this.allProducts=data
        this.filteredProducts = this.allProducts;
        console.log(this.allProducts);  
      },
      error:(err)=>{
        console.log(err);
      }
    })
    new wow.WOW();
  }

  addToFavorites(product: any) {
    this.favorites.push(product);
    console.log('Favorites:', this.favorites);
  }

  filterProducts(category: string) {
    if (category === 'All') {
      this.filteredProducts = this.allProducts;
    } else {
      this.produvtService.getProductsByCategory(category).subscribe({
        next: (data) => {
          this.allProducts = data;
        }
      })
    }
  }


}
