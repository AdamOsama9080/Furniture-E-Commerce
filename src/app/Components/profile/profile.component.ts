import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{


  name = "Hager Ahmed Elrefy";
  image = "assets/profile.jpg";
  mail = "Hager@gmail.com";
  address = {street:"123 str" , city:"cairo" , country:"Eygpt"};
  phone = [
    {
      id: 1,
      number: "0483665544"
    },
    {
      id: 2,
      number: "01226757955"
    },
    {
      id: 3,
      number: "01211154120"
    }
  ];


  screenWidth: number = 0;
  favorites = [
    { id: 2, product: "eyeshadow", productImg: "https://source.unsplash.com/featured/?eyeshadow"    , isFav: true },
    { id: 4, product: "foundation", productImg: "https://source.unsplash.com/featured/?foundation"    , isFav: true },
    { id: 5, product: "bronzer", productImg: "https://source.unsplash.com/featured/?bronzer", isFav: true },
    { id: 6, product: "nailpolish", productImg: "https://source.unsplash.com/featured/?nailpolish"    , isFav: true },
    { id: 9, product: "eyeliner", productImg: "https://source.unsplash.com/featured/?eyeliner", isFav: true },
    { id: 11, product: "concealer", productImg: "https://source.unsplash.com/featured/?concealer", isFav: true },
    { id: 12, product: "highlighter", productImg: "https://source.unsplash.com/featured/?highlighter", isFav: true }
];
  products = [
    { id: 1, product: "Lipstick", productImg: "https://source.unsplash.com/featured/?lipstick", isFav: false },
    { id: 2, product: "eyeshadow", productImg: "https://source.unsplash.com/featured/?eyeshadow"    , isFav: true },
    { id: 3, product: "mascara", productImg: "https://source.unsplash.com/featured/?mascara"    , isFav: false },
    { id: 4, product: "foundation", productImg: "https://source.unsplash.com/featured/?foundation"    , isFav: true },
    { id: 5, product: "bronzer", productImg: "https://source.unsplash.com/featured/?bronzer", isFav: true },
    { id: 6, product: "nailpolish", productImg: "https://source.unsplash.com/featured/?nailpolish"    , isFav: true },
    { id: 7, product: "powder", productImg: "https://source.unsplash.com/featured/?powder", isFav: false },
    { id: 8, product: "blush", productImg: "https://source.unsplash.com/featured/?blush", isFav: false },
    { id: 9, product: "eyeliner", productImg: "https://source.unsplash.com/featured/?eyeliner", isFav: false },
    { id: 10, product: "lipgloss", productImg: "https://source.unsplash.com/featured/?lipgloss", isFav: false },
    { id: 11, product: "concealer", productImg: "https://source.unsplash.com/featured/?concealer", isFav: true },
    { id: 12, product: "highlighter", productImg: "https://source.unsplash.com/featured/?highlighter", isFav: true }
];
  favChunkSize: number = 3;
  favChunks : any[][] = [];
  productChunks : any[][] = [];
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.favChunksControls();
    this.renderer.listen('window', 'resize', (event) => {
      this.screenWidth = window.innerWidth;
    this.favChunksControls();
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  favChunksControls(){
    if(this.screenWidth< 576){
      this.favChunkSize = 1;
    }else if(this.screenWidth >= 576 && this.screenWidth <= 768){
      this.favChunkSize = 2;
    }else{
      this.favChunkSize = 3;
    }
    this.favChunks = [];
    this.productChunks = [];
    for (let i = 0; i < this.favorites.length; i += this.favChunkSize) {
      this.favChunks.push(this.favorites.slice(i, i + this.favChunkSize));
  }
  for (let i = 0; i < this.products.length; i += this.favChunkSize) {
    this.productChunks.push(this.products.slice(i, i + this.favChunkSize));
}


  }
  count=0;
  handleRightBtn(){
    if(this.count == this.favChunks.length -1){
      this.count = 0;
    }else{
      this.count++;
    }
  }
  handleLeftBtn(){
    if(this.count === 0){
      this.count = this.favChunks.length - 1;
    }else{
      this.count--;
    }
  }
  productchuncksCount = 0;
  handleLeftProductBtn(){
    if(this.productchuncksCount === 0){
      this.productchuncksCount = this.productChunks.length - 1;
    }else{
      this.productchuncksCount--;
    }
  }
  handleRightProductBtn(){
    if(this.productchuncksCount == this.productChunks.length -1){
      this.productchuncksCount = 0;
    }else{
      this.productchuncksCount++;
    }
  }
}
