import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsComponent } from '../../../componets/layout/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CardsComponent, FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  mainImage: string = '/assets/images/portatil-a.png'; // Imagen principal
  quantity: number = 1; // Cantidad inicial
  userRating: number = 0; // Valoración del usuario
  reviewText: string = ''; // Texto de la valoración
  averageRating: number = 0.0; // Valoración promedio
  ratings: { rating: number, review: string }[] = []; // Arreglo para almacenar reseñas
  stars: number[] = Array(5).fill(0); // Para mostrar estrellas llenas
  starsEmpty: number[] = Array(5).fill(0); // Para mostrar estrellas vacías

  changeImage(event: Event) {
    const target = event.target as HTMLImageElement;
    this.mainImage = target.src; // Cambia la imagen principal a la de la miniatura seleccionada
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
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
    // Inicializar los arrays de estrellas
    this.stars = Array(Math.floor(this.averageRating)).fill(1);
    this.starsEmpty = Array(5 - Math.floor(this.averageRating)).fill(0);
  }
}
