import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { InternalPageComponent } from '../internal-page/internal-page.component';
import { CardsComponent } from '../cards/cards.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    InternalPageComponent,
    CardsComponent,
    FooterComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
