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


    private person;
    private movies = [];
    private directed = [];
    private person_str: string = "Leonardo DiCaprio";
    private searchTermStream = new Subject<string>();

    private searched_str: string;
    private status_message: string;

    constructor(private serverRequestsService: ServerRequestsService) {
    }

    ngOnInit() {
        this.findPerson();
    }

    private findPerson() {
        this.searched_str = this.person_str;
        this.serverRequestsService.getAroundPerson(this.person_str)
            .subscribe(this.server_response, this.error_response);
    }

    server_response = (data) => {
        //find person node
        this.person = data.person;
        this.directed = [];
        this.movies = [];
        for (let link of data.links) {
            if (link.source === this.person.id) {
                if (link.role == null) {
                    this.directed.push(link.target);
                } else {
                    this.movies.push({id: link.target, role: link.role})
                }
            } else {
                if (link.role == null) {
                    this.directed.push(link.source);
                } else {
                    this.movies.push({id: link.target, role: link.role})
                }
            }
        }

        this.graph = data;

    };

    error_response = (status) => {
        if(status == 0){
            this.status_message = "Cannot reach the server";
        }else{
            this.status_message = "No actor named " + this.searched_str + " was found";
        }
    };

    searchPerson() {
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
