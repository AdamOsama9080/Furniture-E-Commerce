import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, NgSelectModule , HttpClientModule ,RouterModule],
  providers: [ProductService],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  product :any={}
  id:any;

  constructor(private productService: ProductService , myactive:ActivatedRoute) {
    this.id = myactive.snapshot.params[`id`];
    }
    ngOnInit(): void {
      // throw new Error('Method not implemented.');
      this.productService.getProduct(this.id).subscribe({
        next:(data)=>this.product = data,
        error:(err)=>console.log(err)
      })
    }


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

  productData: any = {}; 

  onTagsChange(selectedTags: any) {
    this.productData.tags = selectedTags;
    console.log(this.productData);
  }

  updateProduct(title: any, supTitle: any, category: any, height: any, width: any, stock: any, price: any, imgUrl: any, review: any, description: any): void {
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
  
    this.productService.updateProduct(this.id, this.productData).subscribe(
      (res) => {
        console.log(res);  
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update the product!',
        });
      }
    );    
  }
  
  deleteProduct(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(this.id).subscribe(
          (res) => {
            console.log(res);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the product.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
}
