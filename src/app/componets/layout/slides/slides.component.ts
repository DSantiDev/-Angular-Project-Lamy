import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.css'
})
export class SlidesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;
  @ViewChild('nextButton') nextButton!: ElementRef;
  
  items!: NodeListOf<HTMLElement>;
  index: number = 0;
  interval: number = 10000;
  autoSlideInterval: any;

  ngAfterViewInit() {
    this.items = this.carouselWrapper.nativeElement.querySelectorAll('.carousel-item');
    this.startAutoSlide();
    this.prevButton.nativeElement.addEventListener('click', () => this.prevSlide());
    this.nextButton.nativeElement.addEventListener('click', () => this.nextSlide());
  }

  ngOnDestroy() {
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
