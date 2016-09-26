"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var person_info_component_1 = require("./shared/person-info/person-info.component");
var server_requests_service_1 = require("./server-requests.service");
var main_page_component_1 = require('./main-page/main-page.component');
var app_routing_1 = require("./app.routing");
var movie_page_component_1 = require('./movie-page/movie-page.component');
var movie_info_component_1 = require('./shared/movie-info/movie-info.component');
var graph_component_1 = require('./shared/graph/graph.component');
var actor_page_component_1 = require('./actor-page/actor-page.component');
var about_page_component_1 = require('./about-page/about-page.component');
var d3_ng2_service_1 = require("d3-ng2-service");
var collaboration_page_component_1 = require('./collaboration-page/collaboration-page.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                person_info_component_1.PersonInfoComponent,
                main_page_component_1.MainPageComponent,
                movie_page_component_1.MoviePageComponent,
                movie_info_component_1.MovieInfoComponent,
                graph_component_1.GraphComponent,
                actor_page_component_1.ActorPageComponent,
                about_page_component_1.AboutPageComponent,
                collaboration_page_component_1.CollaborationPageComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            providers: [server_requests_service_1.ServerRequestsService, d3_ng2_service_1.D3Service],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
