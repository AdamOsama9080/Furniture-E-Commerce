// import { Component,OnInit  } from '@angular/core';
// import { single } from './data'; // Sample data for the chart
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { Color,ScaleType  } from '@swimlane/ngx-charts';
// // import { HttpClient } from '@angular/common/http';
// import { HttpClient, HttpBackend } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [NgxChartsModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css'
// })
// export class DashboardComponent implements OnInit {
//   single: any;
//   view: any = [700, 400];

//   showXAxis = true;
//   showYAxis = true;
//   gradient = false;
//   showLegend = true;
//   showXAxisLabel = true;
//   xAxisLabel = 'Product Title';
//   showYAxisLabel = true;
//   yAxisLabel = 'Price';

//   colorScheme: Color = {
//     name: 'vivid',
//     selectable: true,
//     group: ScaleType.Ordinal,
//     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
//   };
//   constructor(private http: HttpClient,private httpBackend: HttpBackend) {
//     // Sample data for the charts
   
//   }
//   ngOnInit(): void {
//     const httpClient = new HttpClient(this.httpBackend);
//     httpClient.get<any[]>('http://localhost:2000/products').subscribe(data => {
//       this.single = data.map(product => ({ name: product.title, value: product.price }));
//     });
//   }
  



//   // options for the pie chart
//   showLabels = true;

 


// // constructor() {
// //   Object.assign(this, { single });
// // }
// onSelect(event: any): void {
//   console.log(event);
// }

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgxChartsModule, CommonModule, HttpClientModule],
})
export class DashboardComponent implements OnInit {
  single: any;
  view: any = [700, 400];
  products: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Product Title';
  showYAxisLabel = true;
  yAxisLabel = 'Price';

  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:2000/simpleproducts').subscribe(data => {
      this.products = data;  // Store the fetched data
      this.single = this.products.map(product => ({ name: product.title, value: product.price }));
    });
  }

  getCardClass(category: string): string {
    switch (category) {
      case 'vase':
        return 'bg-primary';
      case 'chair':
        return 'bg-success';
      case 'table':
        return 'bg-warning';
      default:
        return 'bg-secondary';  // Fallback class
    }
  }

  getFirst10Words(description: string): string {
    const words = description.split(' ');
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
  }

  onSelect(event: any): void {
    console.log(event);
  }
}


