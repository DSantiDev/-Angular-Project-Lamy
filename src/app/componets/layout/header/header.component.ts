import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from "../../../pages/login/login.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LoginComponent, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
