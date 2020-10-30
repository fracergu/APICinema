import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { NowPlayingResponse, Movie } from '../interfaces/now-playing-response'
import { MovieDetails } from '../interfaces/movie-details'
import { ActorDetails } from '../interfaces/actor-details'
import { Cast, CastDetails } from '../interfaces/cast-details'
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string  = 'https://api.themoviedb.org/3'
  private pageNumber       = 1;
  private lang: string     = 'es-ES';
  public  loading: boolean = false;


  constructor( private http: HttpClient) { }

  get params(){
    return {
      api_key: 'bf318d47c861e445e4a533594b4ec22e',
      language: this.lang,
      page: this.pageNumber.toString()
    }
  }

  getNowPlaying():Observable<Movie[]>{

    if (this.loading){
      return of([]);
    }

    this.loading = true;

    return this.http.get<NowPlayingResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results),
      tap( () => {
        this.pageNumber += 1;
        this.loading = false;
      })
    )

  }

  searchMovies(query: string):Observable<Movie[]>{

    const params = {...this.params, page: '1', query: query, include_adult: 'false'};

    return this.http.get<NowPlayingResponse>(`${this.baseUrl}/search/movie`,{
      params: params
    }).pipe(
      map( resp => resp.results)
    )
  }

  resetPage(){
    this.pageNumber = 1;
  }

  getMovieDetails(id: string){
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getMovieCast(id: string): Observable<Cast[]>{
    return this.http.get<CastDetails>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of(null))
    );
  }

  getActorDetails(id: string): Observable<ActorDetails>{
    return this.http.get<ActorDetails>(`${this.baseUrl}/person/${id}`, {
      params: this.params
    })
  }

  getActorMovies(id: string): Observable<Movie[]>{

    const params = {...this.params, include_adult: 'false', with_cast: id};

    return this.http.get<NowPlayingResponse>(`${this.baseUrl}/discover/movie`, {
      params: params
    }).pipe(
      map( resp => resp.results),
      tap( () => {
        this.pageNumber += 1;
        this.loading = false;
      }),
      catchError( err => of(null))
    )
  }

}
