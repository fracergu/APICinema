import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/now-playing-response';
import Swiper, {Autoplay} from 'swiper';

//Enables Swiper autoplay
Swiper.use([Autoplay]);

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  public swiper: Swiper;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit(){

    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay : {delay:5000}
    })
    
  }

  onSlidePrev(){
    this.swiper.slidePrev();
  }
  onSlideNext(){
    this.swiper.slideNext();
  }
  navigateTo(id: string){
    this.router.navigate(['/movie', id])
  }

}
