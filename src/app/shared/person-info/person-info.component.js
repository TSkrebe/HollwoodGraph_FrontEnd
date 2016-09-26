"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PersonInfoComponent = (function () {
    function PersonInfoComponent(serverRequestsService) {
        this.serverRequestsService = serverRequestsService;
    }
    PersonInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.person = this.serverRequestsService.getPerson("random").subscribe(function (person) { return _this.person = person; });
    };
    PersonInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-person-info',
            templateUrl: './person-info.component.html',
            styleUrls: ['./person-info.component.css']
        })
    ], PersonInfoComponent);
    return PersonInfoComponent;
}());
exports.PersonInfoComponent = PersonInfoComponent;
