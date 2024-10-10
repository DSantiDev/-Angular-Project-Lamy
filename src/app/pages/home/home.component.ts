import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardsOfertsComponent } from '../../componets/layout/cards-oferts/cards-oferts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardsOfertsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;
  
  items!: NodeListOf<HTMLElement>;
  index: number = 0;
  interval: number = 10000;
  autoSlideInterval: any;

  ngAfterViewInit() {
    // Seleccionamos los elementos dentro de la vista
    this.items = this.carouselWrapper.nativeElement.querySelectorAll('.carousel-item');

    // Iniciar el auto-slide
    this.startAutoSlide();

    // Agregar listeners a los botones
    this.prevButton.nativeElement.addEventListener('click', () => this.prevSlide());
    this.nextButton.nativeElement.addEventListener('click', () => this.nextSlide());
  }

  ngOnDestroy() {
    // Limpiar el intervalo al destruir el componente
    clearInterval(this.autoSlideInterval);
  }

  updateCarousel() {
    const offset = -this.index * 100;
    this.carouselWrapper.nativeElement.style.transform = `translateX(${offset}%)`;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.index = (this.index < this.items.length - 1) ? this.index + 1 : 0;
      this.updateCarousel();
    }, this.interval);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  prevSlide() {
    this.index = (this.index > 0) ? this.index - 1 : this.items.length - 1;
    this.updateCarousel();
    this.restartAutoSlide();
  }

  nextSlide() {
    this.index = (this.index < this.items.length - 1) ? this.index + 1 : 0;
    this.updateCarousel();
    this.restartAutoSlide();
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
