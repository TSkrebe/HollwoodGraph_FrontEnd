import {Component, OnInit} from '@angular/core';
import {ServerRequestsService} from "../server-requests.service";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-actor-page',
    templateUrl: './actor-page.component.html',
    styleUrls: ['./actor-page.component.css']
})
export class ActorPageComponent implements OnInit {

    constructor(private serverRequestsService: ServerRequestsService) {
    }

    private person: any;
    private movies: any;

    private person_str: string = "Leonardo DiCaprio";
    private searchTermStream = new Subject<string>();

    ngOnInit() {

        //random actor
        this.findPerson();

    }

    private findPerson() {
        this.serverRequestsService.getAroundPerson(this.person_str)
            .subscribe(this.server_response);
    }

    server_response = (data) => {
        //find person node
        this.person = data.person;

        let movies = [];
        for (let link of data.links) {
            if (link.source === this.person.id) {
                movies.push({id: link.target, group: link.role})
            } else {
                movies.push({id: link.source, group: link.role})
            }
        }

        this.movies = movies;
        this.graph = data;

    };

    searchPerson(){
        console.log(this.person_str);
        this.findPerson();
    }

    search(term: string) {
        this.person_str = term;
        this.searchTermStream.next(term);
    }


    items: Observable<string[]> = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.serverRequestsService.search(term, 'person'));


}
