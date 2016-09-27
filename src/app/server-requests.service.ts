import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Stats} from "./classes/stats";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Person} from "./classes/person";
import {Movie} from "./classes/movie";

@Injectable()
export class ServerRequestsService {

    constructor(private http: Http) { }
    //
    // stats_url = 'http://localhost:8000/api/stats';
    // search_url = 'http://localhost:8000/api/search/';
    // random_graph_url = 'http://localhost:8000/api/random-graph';
    // around_movie = 'http://localhost:8000/api/around-movie/';
    // around_person = 'http://localhost:8000/api/around-person/';
    // around_node = 'http://localhost:8000/api/around-node/';
    // collaborations = 'http://localhost:8000/api/collaborations/';

    stats_url = 'api/stats';
    search_url = 'api/search/';
    random_graph_url = 'api/random-graph';
    around_movie = 'api/around-movie/';
    around_person = 'api/around-person/';
    around_node = 'api/around-node/';
    collaborations = 'api/collaborations/';

    getStats() : Observable<Stats>{
        return this.http.get(this.stats_url)
            .map(response=> response.json())
            .do(data => console.log('all: ' + JSON.stringify(data)));
    }

    // getPerson(personName: string) : Observable<Person>{
    //     return this.http.get(this.person_url)
    //         .map(response => response.json())
    //         .do(data => console.log('all: ' + JSON.stringify(data)))
    //         .catch(this.handle);
    // }


    search(term: string, group: string){
        return this.http.get(this.search_url + group + '/' + term)
            .map(response =>  <string[]> response.json().results)
            .do(data => console.log("search: " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAroundMovie(movie_title: string){
        return this.http.get(this.around_movie + movie_title)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getAroundPerson(person_name: string){
        return this.http.get(this.around_person + person_name)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getAroundNode(id: string, group: string){
        return this.http.get(this.around_node + id + '/' + group)
            .map(response => response.json());
    }

    peopleCollaborations(first: string, second: string){
        return this.http.get(this.collaborations + first + '/' + second)
            .map(response => response.json());
    }

    getPersonImage(url: string){
        return this.http.get(url)
            .map(response => response.json());

    }
    getPersonData(url: string){
        return this.http.get(url)
            .map(response => response.json());
    }
    private handleError (error: any) {
        console.log(error);
        return Observable.throw(error.status);
    }
    getRandomGraph(){
        return this.http.get(this.random_graph_url)
            .map(response => response.json());
    }



}
