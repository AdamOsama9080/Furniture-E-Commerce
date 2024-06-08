import Swal from 'sweetalert2';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/app/Services/product.service';
// ProductService
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, NgSelectModule , HttpClientModule],
  providers: [ProductService],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})

export class CreateProductComponent {
  constructor(private productService: ProductService) {}
  tags = [
    "vase", "decor", "modern",
    "minimalist", "ceramic", "rustic",
    "metal", "glass", "chic",
    "crystal", "elegant", "contemporary",
    "geometric", "floral", "metallic",
    "lighting", "pendant", "floor lamp",
    "desk lamp", "chandelier", "wall sconce",
    "table lamp", "ceiling light", "track light",
    "clock", "wall clock", "table clock",
    "desk clock", "digital", "retro",
    "alarm clock", "coffee table", "side table",
    "dining table", "console table", "end table",
    "armchair", "dining chair", "office chair",
    "accent chair", "bar stool", "lounge chair",
    "stylish", "classic", "cozy", "elegant"
  ];

  placeholder = "Select tags";
  productData: any = {}; 

  onTagsChange(selectedTags: any) {
    this.productData.tags = selectedTags;
    console.log(this.productData);
  }


  createProduct(title: any, supTitle: any, category: any, height: any, width: any, stock: any, price: any, imgUrl: any, review: any, description: any): void {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productData = {
          ...this.productData, 
          title,
          supTitle,
          category,
          dimensions: {
            height,
            width
          },
          stock: stock === 'true',
          price,
          imgUrl,
          review,
          description
        };
        console.log(this.productData);
        
        this.productService.createProduct(this.productData).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Saved!', '', 'success');
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to create the product!',
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
