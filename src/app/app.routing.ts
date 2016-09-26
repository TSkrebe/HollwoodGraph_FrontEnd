/**
 * Created by titas on 16.9.15.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviePageComponent} from "./movie-page/movie-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ActorPageComponent} from "./actor-page/actor-page.component";
import {AboutPageComponent} from "./about-page/about-page.component";
import {CollaborationPageComponent} from "./collaboration-page/collaboration-page.component";


const appRoutes: Routes = [
    { path: '', component: MainPageComponent},
    { path: 'movie', component: MoviePageComponent },
    { path: 'actor', component: ActorPageComponent},
    { path: 'about', component: AboutPageComponent},
    { path: 'collaboration', component: CollaborationPageComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);