import {Component, OnInit} from '@angular/core';
import {ServerRequestsService} from "../server-requests.service";
import {Stats} from "../classes/stats";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    private stats: Stats;
    private graph;

    constructor(private serverRequestService: ServerRequestsService) {
    }

    ngOnInit() {

        this.stats = this.serverRequestService
            .getStats()
            .subscribe((stats: Stats) => this.stats = stats);

        this.generateRandom();

    }

    generateRandom() {
        this.serverRequestService
            .getRandomGraph()
            .subscribe(graph => this.graph = graph);
    }
}
