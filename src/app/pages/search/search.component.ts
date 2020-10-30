import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/now-playing-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public text: string    = '';
  public movies: Movie[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private service: MoviesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.text = params.text;
      this.service.searchMovies(params.text).subscribe(resp => {
        // Return filtered result: Only movies with poster.
        this.movies = resp.filter(movie => movie.poster_path !== null);
      })
    })
  }

}
