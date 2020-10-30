import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/now-playing-response';
import { MoviesService } from 'src/app/services/movies.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];


  @HostListener('window:scroll', ['$event'])

  onScroll(){
    
    //Automatic loading when scroll is reaching the end of the page.

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight + 1;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    console.log(pos)
    console.log(max)

    if (pos > max && !this.service.loading){
      this.service.getNowPlaying().subscribe( result => {
        // Return filtered result: Only movies with poster.
        this.movies.push(...result.filter(movie => movie.poster_path !== null))
      });
    }

  }

  constructor(private service: MoviesService) { 
    
  }

  ngOnInit(): void {

    this.service.getNowPlaying().subscribe(result => {

      // Slideshow and Movies list are separated to avoid increase slideshow movies when scrolling.
      this.movies          = result.filter(movie => movie.poster_path !== null);
      this.moviesSlideshow = result.filter(movie => movie.poster_path !== null);
      
    })
  }

  ngOnDestroy() {
    this.service.resetPage();
  }

}
