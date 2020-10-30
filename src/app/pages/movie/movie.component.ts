import { Location } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/cast-details';
import { MovieDetails } from 'src/app/interfaces/movie-details';
import { Movie } from 'src/app/interfaces/now-playing-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie: MovieDetails;
  public similarMovies: Movie[] = [];
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private service : MoviesService,
              private location : Location,
              private router : Router) {  }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.service.getMovieDetails(id),
      this.service.getMovieCast(id)
    ]).subscribe( ([movie, cast]) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      } else {
        
        this.movie = movie;
        // Return filtered cast: Only actors with profile picture.
        this.cast = cast.filter( actor => actor.profile_path !== null);
      }
    })

  }

  routeBack(){
    this.location.back();
  }
}
