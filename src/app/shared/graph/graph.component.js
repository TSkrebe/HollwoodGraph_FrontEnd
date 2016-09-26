"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var GraphComponent = (function () {
    function GraphComponent(d3Service, element) {
        this.nodes = [
            { "id": "Myriel", "group": 10 },
            { "id": "Myriel", "group": 10 },
            { "id": "Napoleon", "group": 10 },
            { "id": "Mlle.Baptistine", "group": 1 },
            { "id": "Mme.Magloire", "group": 1 },
            { "id": "CountessdeLo", "group": 1 },
            { "id": "Geborand", "group": 1 },
            { "id": "Champtercier", "group": 1 },
            { "id": "Cravatte", "group": 1 },
            { "id": "Count", "group": 1 },
            { "id": "OldMan", "group": 1 },
            { "id": "Valjean", "group": 2 },
            { "id": "Tholomyes", "group": 3 },
            { "id": "Listolier", "group": 3 },
            { "id": "Fameuil", "group": 3 },
            { "id": "Blacheville", "group": 3 },
            { "id": "Favourite", "group": 3 },
            { "id": "Dahlia", "group": 3 },
            { "id": "Zephine", "group": 3 },
            { "id": "Fantine", "group": 3 }
        ];
        this.links = [
            { "source": "Napoleon", "target": "Myriel" },
            { "source": "Napoleon", "target": "Myriel" },
            { "source": "Mlle.Baptistine", "target": "Myriel" },
            { "source": "Mme.Magloire", "target": "Myriel" },
            { "source": "CountessdeLo", "target": "Myriel" },
            { "source": "Geborand", "target": "Myriel" },
            { "source": "Champtercier", "target": "Myriel" },
            { "source": "Cravatte", "target": "Myriel" },
            { "source": "Count", "target": "Myriel" },
            { "source": "OldMan", "target": "Myriel" },
            { "source": "Valjean", "target": "Myriel" },
            { "source": "Fameuil", "target": "Tholomyes" },
            { "source": "Fameuil", "target": "Listolier" },
            { "source": "Blacheville", "target": "Fameuil" },
            { "source": "Favourite", "target": "Fameuil" },
            { "source": "Dahlia", "target": "Fameuil" },
            { "source": "Zephine", "target": "Fameuil" },
            { "source": "Fantine", "target": "Fameuil" }];
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }
    GraphComponent.prototype.onResize = function () {
        var w = +this.svg.style('width').slice(0, -2), h = +this.svg.style('height').slice(0, -2);
        this.simulation.force('centre').x(w / 2).y(h / 2);
        this.simulation.restart();
    };
    GraphComponent.prototype.ngOnInit = function () {
        var d3 = this.d3;
        this.svg = this.d3.select('svg');
        var width = +this.svg.style('width').slice(0, -2), height = +this.svg.style('height').slice(0, -2);
        this.container = this.svg.append('g');
        this.container.append('g')
            .attr('class', 'links');
        this.container.append('g')
            .attr('class', 'nodes');
        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(function (d) { return d.id; }))
            .force('centre', d3.forceCenter(width / 2, height / 2))
            .force('charge', d3.forceManyBody());
        this.addLinks();
        this.addNodes();
        function ticked() {
            var nodes = d3
                .select('.nodes')
                .selectAll('circle');
            var links = d3
                .select('.links')
                .selectAll('line');
            links.attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; });
            nodes.attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; });
        }
        this.simulation.nodes(this.nodes)
            .on('tick', ticked)
            .force('link').links(this.links);
    };
    GraphComponent.prototype.zoomed = function () {
        //this.container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    };
    GraphComponent.prototype.addNodes = function () {
        this.d3.select('.nodes')
            .selectAll('circle')
            .data(this.nodes, function (node) { return node.id; })
            .enter()
            .append('circle')
            .attr('fill', 'red')
            .attr('r', 5);
        // .call(this.drag()
        //     .on("start", this.dragStarted)
        //     .on("drag", this.dragged)
        //     .on("end", this.dragEnded));
    };
    GraphComponent.prototype.dragStarted = function (d) {
        this.simulation.restart();
        d.fx = d.x;
        d.fy = d.y;
    };
    GraphComponent.prototype.dragged = function (d) {
        this.simulation.restart();
        d.fx = this.d3.event.x;
        d.fy = this.d3.event.y;
    };
    GraphComponent.prototype.dragEnded = function (d) {
        d.fx = null;
        d.fy = null;
    };
    GraphComponent.prototype.addLinks = function () {
        this.d3.select('.links')
            .selectAll('line')
            .data(this.links)
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1);
    };
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'app-graph',
            templateUrl: './graph.component.html',
            styleUrls: ['./graph.component.css']
        })
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;
