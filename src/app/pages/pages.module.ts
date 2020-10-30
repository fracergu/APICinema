import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component'
import { MovieComponent } from './movie/movie.component'
import { SearchComponent } from './search/search.component'
import { ComponentsModule } from '../components/components.module'
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { ActorComponent } from './actor/actor.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    SearchComponent,
    ActorComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule,
    NgxSpinnerModule
  ]
})
export class PagesModule { }
