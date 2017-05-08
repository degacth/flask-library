import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RouteBuilder} from "../../service/route-builder.service";

@Component({
    selector: 'author-base',
    moduleId: module.id,
    templateUrl: 'base.component.html',
    providers: [RouteBuilder],
})
export class BaseComponent {
    constructor(private routeBuilder: RouteBuilder) {
    }

    get urlPrefix(): string {
        return this.routeBuilder.prefix;
    }
}
