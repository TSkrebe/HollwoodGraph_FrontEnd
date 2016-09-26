import {Component, OnInit, OnChanges} from '@angular/core';
import {ServerRequestsService} from "../../server-requests.service";
import {Movie} from "../../classes/movie";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-movie-info',
    templateUrl: './movie-info.component.html',
    styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit, OnChanges {

    constructor(private serverRequestsService: ServerRequestsService) {
    }

    @Input() movie: Movie;
    private default_url = "movie.jpg";
    private movie_url = "movie.jpg";

    ngOnInit() {
        console.log(this.movie);
    }

    ngOnChanges(...args: any[]) {
        if (this.movie != null) {
            let moviedb_id = this.movie.moviedb_id;
            let url = "https://api.themoviedb.org/3/movie/" + moviedb_id + "?api_key=d4d78a6e08d09913f70499a86c58e426";
            this.serverRequestsService.getPersonData(url).subscribe(this.image_return)
        }

    }

    image_return = (data) => {
        let path = data.poster_path;
        if(path == null){
            this.movie_url = this.default_url;
        }
        this.movie_url = "http://image.tmdb.org/t/p/w185" + path;
    }
}

