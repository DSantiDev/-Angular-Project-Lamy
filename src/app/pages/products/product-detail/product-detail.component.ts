import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsComponent } from '../../../componets/layout/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { ResponsePro } from '../../../interfaces/response';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CardsComponent, FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  mainImage: string = '/assets/images/portatil-a.png'; // Imagen principal
  quantity: number = 1; // Cantidad inicial
  userRating: number = 0; // Valoración del usuario
  reviewText: string = ''; // Texto de la valoración
  averageRating: number = 0.0; // Valoración promedio
  ratings: { rating: number, review: string }[] = []; // Arreglo para almacenar reseñas
  stars: number[] = Array(5).fill(0); // Para mostrar estrellas llenas
  starsEmpty: number[] = Array(5).fill(0); // Para mostrar estrellas vacías
  product!: Product;
  products: Product[] = [];

  mostrarValidacion: boolean = false;
  mostrarDescription: boolean = false;
  mostrarEspecificaciones: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService 
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
    // Desactivar todas las pestañas
    this.mostrarDescription = false;
    this.mostrarValidacion = false;
    this.mostrarEspecificaciones = false;

    // Activar la pestaña correspondiente
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

    // Agregar la nueva valoración a la lista
    this.ratings.push({ rating: this.userRating, review: this.reviewText });

    // Actualizar el promedio de valoraciones
    this.averageRating = this.calculateAverageRating();

    // Reiniciar los campos
    this.userRating = 0; // Cambia a 0 si es necesario
    this.reviewText = '';

    // Aquí podrías agregar lógica para enviar las valoraciones a un servidor
  }

  calculateAverageRating(): number {
    const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / this.ratings.length || 0; // Evitar división por cero
  }

  getRatingPercentage(star: number): number {
    const count = this.ratings.filter(rating => rating.rating === star).length;
    return (count / this.ratings.length) * 100 || 0; // Evitar división por cero
  }

  
ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id'); // Obtener el ID del producto de la ruta
  if (productId) {
    this.productService.getProduct(productId).subscribe((response: ResponsePro) => {
      if (response.ok && response.data) { // Verificar que la respuesta sea exitosa y que haya datos
        this.product = response.data; // Asignar el objeto del producto
      } else {
        console.error('Error fetching product:', response.msg);
        // Manejar el error adecuadamente aquí
      }
    }, error => {
      console.error('Error fetching product:', error);
      // Manejar el error adecuadamente aquí
    });
  }
  this.productService.getAllProducts().subscribe( data => {
    this.products = data;
    console.log( this.products );
  });
}
  
}
