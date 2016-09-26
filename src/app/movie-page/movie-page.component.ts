import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {ServerRequestsService} from "../server-requests.service";
import {Movie} from "../classes/movie";

@Component({
    selector: 'app-movie-page',
    templateUrl: './movie-page.component.html',
    styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

    private searchTermStream = new Subject<string>();

    private movie: Movie;
    private movie_str: string = "The Matrix";
    private graph;

    private crew;

    constructor(private serverRequestsService: ServerRequestsService) {
    }

    ngOnInit() {
        this.findMovie();
    }

    findMovie() {
        this.serverRequestsService.getAroundMovie(this.movie_str)
            .subscribe(this.server_response);
    }

    server_response = (data) => {

        let crew = [];
        //find movie node
        this.movie = data.movie;

        for (let link of data.links) {
            if (link.source === this.movie.id) {
                crew.push({name: link.target, role: link.role})
            } else {
                crew.push({name: link.source, role: link.role})
            }
        }
        this.crew = crew;
        this.graph = data;

    };

    search(term: string) {
        this.movie_str = term;
        this.searchTermStream.next(term);
    }

    searchMovie() {
        this.findMovie();
        console.log("search", this.movie_str);
    }

    items: Observable<string[]> = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.serverRequestsService.search(term, 'movie'));


}
/*
 *
 * {
 * }
 * */