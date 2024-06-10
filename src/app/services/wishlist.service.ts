import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  private api_url = 'https://json-server-furniture-project.onrender.com/wishlist';

  constructor(private http: HttpClient) { 
  }

  createProduct(product: any) {
    return this.http.post(this.api_url, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.api_url}/${id}`);
  }

  getProduct(id: any) {
    return this.http.get(`${this.api_url}/${id}`);
  }

  getProducts() {
    return this.http.get<any[]>(this.api_url);
  }

  getLength() {
    return this.http.get<any[]>(this.api_url).pipe(
      map(data => data.length)
    );
  }

  getWishlist() {
    return this.http.get<any[]>(this.api_url);
  }
}
