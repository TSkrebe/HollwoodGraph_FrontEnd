import {Component, OnInit} from '@angular/core';
import {ServerRequestsService} from "../server-requests.service";
import {Person} from "../classes/person";
import {Movie} from "../classes/movie";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'app-collaboration-page',
    templateUrl: './collaboration-page.component.html',
    styleUrls: ['./collaboration-page.component.css']
})
export class CollaborationPageComponent implements OnInit {

    person1: Person;
    person2: Person;

    person1_str: string = "Quentin Tarantino";
    person2_str: string = "Samuel L. Jackson";

    movies: Movie[] = [];


    constructor(private serverRequestsService: ServerRequestsService) {
    }

    ngOnInit() {
        this.collaborations();
    }

    collaborations() {

        this.serverRequestsService
            .peopleCollaborations(this.person1_str, this.person2_str)
            .subscribe(this.server_response);

    }

    server_response = (data) => {
        this.person1 = data.person1;
        this.person2 = data.person2;

        let movies = [];
        for (let node of data.nodes){
            if(node.group == 'Movie'){
                movies.push(node);
            }
        }
        data.nodes.push(data.person1);
        data.nodes.push(data.person2);
        this.movies = movies;
        this.graph = data;
    };

    searchForCollaborations(){
        this.collaborations();
    }

    keyup_person1(){
        this.searchTermStream.next(this.person1_str);
    }
    keyup_person2(){
        this.searchTermStream.next(this.person2_str);
    }

    searchTermStream = new Subject<string>();

    items: Observable<string[]> = this.searchTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.serverRequestsService.search(term, 'person'));


}
