import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SliderComponent } from './Components/slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Components/footer/footer.component';
import { CartModule } from './Components/cart/cart.module';
import { CartService } from './Components/cart/cart.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SliderComponent, RouterOutlet,RouterModule,HttpClientModule,FooterComponent,CartModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit{
  title = 'angularparoject';
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    const savedTotal = this.cartService.getSavedTotal();
    this.cartService.updateTotal(savedTotal);
  }
}
