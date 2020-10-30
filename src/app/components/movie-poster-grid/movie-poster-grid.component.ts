import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/now-playing-response';

@Component({
  selector: 'app-movie-poster-grid',
  templateUrl: './movie-poster-grid.component.html',
  styleUrls: ['./movie-poster-grid.component.css']
})
export class MoviePosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onMovieClick(movie: Movie)
  {
    this.router.navigate(['/movie', movie.id])
  }
}
