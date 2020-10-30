import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ActorDetails } from 'src/app/interfaces/actor-details';
import { MoviesService } from 'src/app/services/movies.service';
import { Location } from '@angular/common';
import { Movie } from 'src/app/interfaces/now-playing-response';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit, OnDestroy {
  public actor: ActorDetails;
  public actorMovies: Movie[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: MoviesService,
    private location: Location,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])

  onScroll() {
    //Automatic loading when scroll is reaching the end of the page.

    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    const id = this.activatedRoute.snapshot.params.id;

    if (pos > max && !this.service.loading) {
      this.service.getActorMovies(id).subscribe((result) => {
        // Return filtered result: Only movies with poster.
        this.actorMovies.push(
          ...result.filter((movie) => movie.poster_path !== null)
        );
      });
    }
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.service.getActorDetails(id),
      this.service.getActorMovies(id),
    ]).subscribe(([actor, movies]) => {
      if (!actor) {
        this.router.navigateByUrl('/home');
        return;
      } else {
        this.actor = actor;
        // Return filtered result: Only movies with poster.
        this.actorMovies = movies.filter((movie) => movie.poster_path !== null);
      }
    });
  }

  ngOnDestroy() {
    this.service.resetPage();
  }
  
  routeBack() {
    this.location.back();
  }
}
