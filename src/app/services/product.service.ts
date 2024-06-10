import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api_url = 'https://json-server-furniture-project.onrender.com/products';
  constructor(private http: HttpClient) { }
  
  getProducts() {
    return this.http.get(this.api_url);
  }

  createProduct(product: any) {
    return this.http.post(this.api_url, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.api_url}/${id}`);
  }

  updateProduct(id: any, product: any) {
    return this.http.put(`${this.api_url}/${id}`, product);
  }

  getProduct(id: any) {
    return this.http.get(`${this.api_url}/${id}`);
  }

  getProductsByCategory(category: any) {
    return this.http.get(`${this.api_url}?category=${category}`);
  }
}
