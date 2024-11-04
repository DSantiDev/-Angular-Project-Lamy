import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardsComponent } from '../../../componets/layout/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { ResponsePro } from '../../../interfaces/response';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CardsComponent, FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  mainImage: string = '/assets/images/portatil-a.png'; 
  quantity: number = 1; 
  userRating: number = 0; 
  reviewText: string = ''; 
  averageRating: number = 0.0; 
  ratings: { rating: number, review: string }[] = []; 
  stars: number[] = Array(5).fill(0); 
  starsEmpty: number[] = Array(5).fill(0); 
  product!: Product;
  products: Product[] = [];

  mostrarValidacion: boolean = false;
  mostrarDescription: boolean = false;
  mostrarEspecificaciones: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private cartService: CartService, 
    private router: Router
  ) {
    console.log( this.mostrarValidacion );
  }

  changeImage(event: Event) {
    const target = event.target as HTMLImageElement;
    this.mainImage = target.src; 
  }

  
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  setActiveTab(tab: string) {
    this.mostrarDescription = false;
    this.mostrarValidacion = false;
    this.mostrarEspecificaciones = false;

    switch (tab) {
      case 'description':
        this.mostrarDescription = true;
        break;
      case 'validation':
        this.mostrarValidacion = true;
        break;
      case 'specifications':
        this.mostrarEspecificaciones = true;
        break;
    }
  }

  submitReview() {
    if (this.reviewText.trim() === '') {
      alert('Por favor, escribe un comentario antes de enviar la valoración.');
      return;
    }
    this.ratings.push({ rating: this.userRating, review: this.reviewText });
    this.averageRating = this.calculateAverageRating();
    this.userRating = 0; 
    this.reviewText = '';

  }

  calculateAverageRating(): number {
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / this.ratings.length || 0; 
  }

  getRatingPercentage(star: number): number {
    const count = this.ratings.filter(rating => rating.rating === star).length;
    return (count / this.ratings.length) * 100 || 0; 
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product); 
    }
  }

  buyNow() {
    if (this.product) {
      const productsToCheckout = [{
        name: this.product.name,
        image: this.product.urlImage,
        price: this.product.price,
        quantity: this.quantity
      }];
  
      this.cartService.setCheckoutProducts(productsToCheckout);
      this.router.navigate(['/checkout']);
    } else {
      console.warn('No hay producto para comprar.');
    }
  }
  
  
  ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id'); 
  if (productId) {
    this.productService.getProduct(productId).subscribe((response: ResponsePro) => {
      if (response.ok && response.data) { 
        this.product = response.data; 
      } else {
        console.error('Error fetching product:', response.msg);
      }
    }, error => {
      console.error('Error fetching product:', error);
    });
  }
  this.productService.getAllProducts().subscribe( data => {
    this.products = data;
    console.log( this.products );
  });
}
  
}
