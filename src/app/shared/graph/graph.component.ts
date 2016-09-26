
import {Component, OnInit, ElementRef, SimpleChanges, OnChanges} from '@angular/core';
import {D3Service, D3} from "d3-ng2-service";
import {Input} from "@angular/core/src/metadata/directives";
import {ServerRequestsService} from "../../server-requests.service";

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges{

    private d3: D3;
    private parentNativeElement: any;
    @Input() s_graph;
    svg: any;
    container: any;
    simulation: any;

    constructor(d3Service: D3Service, element: ElementRef, private serverRequestsService: ServerRequestsService) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }


    onResize(){
        let w = +this.svg.style('width').slice(0, -2),
            h = +this.svg.style('height').slice(0, -2);
        this.simulation.force('centre').x(w / 2).y(h / 2);
        this.simulation.restart();
    }


    init_graph(){

        let d3 = this.d3;
        this.svg = this.d3.select('#svg');
        let width = +this.svg.style('width').slice(0, -2),
            height = +this.svg.style('height').slice(0, -2);

        this.svg.call(this.d3.zoom().scaleExtent([.3, 5]).on("zoom", this.zoomed));

        this.container = this.svg.select('#container');

        this.container.append('g')
            .attr('class', 'links');

        this.container.append('g')
            .attr('class', 'nodes');

        this.container.append('text').attr('id', 'node-info');

        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d=>d.id).distance(()=> {
                return 50
            }))
            .force('centre', d3.forceCenter(width / 2, height / 2))
            .force('charge', d3.forceManyBody())
            .force('collide', d3.forceCollide(10));

        this.link = this.svg.selectAll('line');
        this.node = this.svg.selectAll('circle');
        this.simulation.nodes(this.nodes)
            .on('tick', this.ticked)
            .force('link').links(this.links);
    }


    ngOnChanges(changes: SimpleChanges) {

        if (this.simulation == null)
            this.init_graph();
        if(this.s_graph != null) {
            this.nodes = [];
            this.links = [];
            this.svg.selectAll('circle').remove();
            this.svg.selectAll('line').remove();
            this.addGraph(this.s_graph);
        }

    }
    nodes = [];
    links = [];

    inNodesList(nnode, nnodes){
        for (let node of nnodes){
            if (node.id === nnode.id)
                return true;
        }
        return false;
    }

    inLinksList(nlink, nlinks){
        for (let link of nlinks){
            if ((nlink.source === link.source && nlink.target === link.target) ||
                (nlink.source === link.target && nlink.target === link.source))
                return true;
        }
        return false;
    }
    addGraph(graph) {
        let nnodes =[], nlinks = [];
        outer:
        for(let nnode of graph.nodes){
            for(let onode of this.nodes){
                if(nnode.id === onode.id)
                    continue outer;
            }
            if(this.inNodesList(nnode, nnodes))  continue;
            nnodes.push(nnode);
        }

        louter:
        for(let nlink of graph.links){
            for (let olink of this.links){
                if((nlink.source === olink.source.id && nlink.target === olink.target.id)
                    || (nlink.source === olink.target.id && nlink.target === olink.source.id))
                    continue louter;
            }
            if(this.inLinksList(nlink, nlinks)) continue;
            nlinks.push(nlink);
        }
        console.log(this.links);
        this.nodes.push(...nnodes);
        this.links.push(...nlinks);
        this.addLinks();
        this.addNodes();

        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.links);

        this.simulation.restart();
    }

    private addLinks() {
        this.svg.select('.links')
            .selectAll('line')
            .data(this.links, function (d) {
                    return d.source.id + "-" + d.target.id;
            } )
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .exit().remove();
    }


    private addNodes(){
        let colors = this.d3.scaleOrdinal()
            .range(["red", "green", "blue"])
            .domain(["Actor", "Movie", "Director"]);
        let colors2 = this.d3.scaleOrdinal()
            .range(["#8B0000", "#006400", "#000080"])
            .domain(["Actor", "Movie", "Director"]);

        this.svg.select('.nodes')
            .selectAll('circle')
            .data(this.nodes, node=>node.id)
            .enter()
            .append('circle')
            .attr('fill', d => {
                return colors(d.group)
            })
            .attr('r', 15)
            .attr('stroke', d => {return colors2(d.group)})
            .attr('stroke-width', 2)
            .call(this.d3.drag()
                .on("start", this.dragStarted)
                .on("drag", this.dragged)
                .on("end", this.dragEnded))
            .on('click', this.clicked)
            .on('mouseover', this.mouseOver)
            .on('mouseenter', this.mouseEnter)
            .on('mouseout', this.mouseOut)
            .exit().remove();
    }
    mouseOver = (d: any, i: any) =>{
        console.log(d);
        this.d3.select('#info').text(d.id + ', ' + d.group.toLowerCase());
        //this.d3.select('#node-info').text(d.id).attr('x', d.x).attr('y', d.y);

    };
    mouseOut = (d: any) =>{
       // this.d3.select('#node-info').text("");
    };
    mouseEnter = (d: any) =>{
       // this.d3.select('#node-info').text(d.id).attr('x', d.x).attr('y', d.y);
    };
    dragStarted = (d: any) => {
        if (!this.d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    dragged = (d: any) => {
        d.fx = this.d3.event.x;
        d.fy = this.d3.event.y;

    };

    dragEnded = (d: any) => {
        if (!this.d3.event.active) {
            this.simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    };

    ticked = () => {
        this.svg.selectAll('line')
            .attr('x1', d=>d.source.x)
            .attr('y1', d=>d.source.y)
            .attr('x2', d=>d.target.x)
            .attr('y2', d=>d.target.y);

        this.svg.selectAll('circle')
            .attr('cx', d=>d.x)
            .attr('cy', d=>d.y);
    };

    zoomed = () => {
        this.svg.select('g').attr("transform", this.d3.event.transform);
    };

    clicked = (node) =>{
        console.log(node);
        this.serverRequestsService
            .getAroundNode(node.id, node.group)
            .subscribe(graph => this.addGraph(graph));
    };


}