import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbardComponent } from "./shared/components/navbard/navbard.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
