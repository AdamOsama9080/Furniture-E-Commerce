import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  constructor() { }

  updateTotal(total: number): void {
    this.totalSubject.next(total);
    localStorage.setItem('cartTotal', total.toString());
  }

  getSavedTotal(): number {
    const savedTotal = localStorage.getItem('cartTotal');
    return savedTotal ? parseInt(savedTotal, 10) : 0;
  }
}