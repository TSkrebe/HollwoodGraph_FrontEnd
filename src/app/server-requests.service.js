"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
var ServerRequestsService = (function () {
    function ServerRequestsService(http) {
        this.http = http;
        this.stats_url = 'api/stats.json';
        this.person_url = 'api/person.json';
        this.movie_url = 'api/movie.json';
    }
    ServerRequestsService.prototype.getStats = function () {
        return this.http.get(this.stats_url)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('all: ' + JSON.stringify(data)); });
    };
    ServerRequestsService.prototype.getPerson = function (personName) {
        return this.http.get(this.person_url)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('all: ' + JSON.stringify(data)); })
            .catch(this.handle);
    };
    ServerRequestsService.prototype.getMovie = function (movieTitle) {
        return this.http.get(this.movie_url)
            .map(function (response) { return response.json(); });
    };
    ServerRequestsService.prototype.handle = function (error) {
        console.log(error);
    };
    ServerRequestsService = __decorate([
        core_1.Injectable()
    ], ServerRequestsService);
    return ServerRequestsService;
}());
exports.ServerRequestsService = ServerRequestsService;
