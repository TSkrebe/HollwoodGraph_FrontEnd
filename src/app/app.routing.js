"use strict";
var router_1 = require('@angular/router');
var movie_page_component_1 = require("./movie-page/movie-page.component");
var main_page_component_1 = require("./main-page/main-page.component");
var actor_page_component_1 = require("./actor-page/actor-page.component");
var about_page_component_1 = require("./about-page/about-page.component");
var collaboration_page_component_1 = require("./collaboration-page/collaboration-page.component");
var appRoutes = [
    { path: '', component: main_page_component_1.MainPageComponent },
    { path: 'movie', component: movie_page_component_1.MoviePageComponent },
    { path: 'actor', component: actor_page_component_1.ActorPageComponent },
    { path: 'about', component: about_page_component_1.AboutPageComponent },
    { path: 'collaboration', component: collaboration_page_component_1.CollaborationPageComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
