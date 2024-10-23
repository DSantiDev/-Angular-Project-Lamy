import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  products: any;
  constructor(private productService: ProductService){
    
  }
  ngOnInit():void{
      this.productService.getAllProducts().subscribe((data) => {
        console.log(data)
        this.products = data.data
      })
  }

}
