import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-carousel-config',
  standalone: true,
  imports: [NgbCarouselModule, NgIf],
  templateUrl: './carousel-config.component.html',
  styleUrls: ['./carousel-config.component.css'],
  providers: [NgbCarouselConfig],
})
export class CarouselConfigComponent{

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1150/500`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

}
