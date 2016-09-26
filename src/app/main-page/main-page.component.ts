import {Component, OnInit} from '@angular/core';
import {ServerRequestsService} from "../server-requests.service";
import {Stats} from "../classes/stats";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    stats: Stats;

    constructor(private serverRequestService: ServerRequestsService) {
    }
    graph;
    ngOnInit() {

        this.stats = this.serverRequestService
            .getStats()
            .subscribe((stats: Stats) => this.stats = stats);

        console.log("EHHEHEHEHHEHEHEH");
        this.generateRandom();

    }

    generateRandom(){
        this.serverRequestService
            .getRandomGraph()
            .subscribe(graph => this.graph = graph);
        console.log("GENERATE NEW")
    }
}
