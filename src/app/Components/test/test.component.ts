import { Component } from '@angular/core';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-test',
  standalone: true,
  // imports: [CreateProductComponent  ],
  // imports: [UpdateProductComponent],
  imports: [FooterComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
