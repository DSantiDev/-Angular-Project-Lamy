import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./componets/layout/header/header.component";
import { FooterComponent } from "./componets/layout/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'Frontend-Lamy'

  ngOnInit() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }
}
  
