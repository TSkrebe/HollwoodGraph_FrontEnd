import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PersonInfoComponent} from "./shared/person-info/person-info.component";
import {ServerRequestsService} from "./server-requests.service";
import { MainPageComponent } from './main-page/main-page.component';
import {routing} from "./app.routing";
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MovieInfoComponent } from './shared/movie-info/movie-info.component';
import { GraphComponent } from './shared/graph/graph.component';
import { ActorPageComponent } from './actor-page/actor-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {D3Service} from "d3-ng2-service";
import { CollaborationPageComponent } from './collaboration-page/collaboration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonInfoComponent,
    MainPageComponent,
    MoviePageComponent,
    MovieInfoComponent,
    GraphComponent,
    ActorPageComponent,
    AboutPageComponent,
    CollaborationPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ServerRequestsService, D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
