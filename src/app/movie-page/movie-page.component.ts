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
    private actors = [];
    private directors: string[] = [];
    private status_message: string;

    private searched_str: string;
    constructor(private serverRequestsService: ServerRequestsService) {
    }

    ngOnInit() {
        this.findMovie();
    }

    findMovie() {
        this.searched_str = this.movie_str;
        this.serverRequestsService
            .getAroundMovie(this.movie_str)
            .subscribe(this.server_response, this.movie_error);
    }

    movie_error = (status) =>{
        if (status == 0){
            this.status_message = "Cannot reach the server";
        }else{
            this.status_message = "No movie called " + this.searched_str + " was found";
        }
    };
    server_response = (data) => {
        //find movie node
        this.movie = data.movie;
        this.actors = [];
        this.directors = [];
        for (let link of data.links) {
            if (link.source === this.movie.id) {
                if(link.role == null){
                    this.directors.push(link.target)
                }else{
                    this.actors.push({name: link.target, role: link.role})
                }
            } else {
                if(link.role == null){
                    this.directors.push(link.source)
                }else{
                    this.actors.push({name: link.source, role: link.role})
                }
            }
        }
        this.graph = data;
        this.status_message = "";
    };

    search(term: string) {
        this.movie_str = term;
        this.searchTermStream.next(term);
    }

    searchMovie() {
        this.findMovie();
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