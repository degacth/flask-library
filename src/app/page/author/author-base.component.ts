import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RouteBuilder} from "../../shared/service/route-builder.service";

@Component({
    selector: 'author-base',
    moduleId: module.id,
    templateUrl: 'author-base.component.html',
    providers: [RouteBuilder],
})
export class AuthorBaseComponent {
    constructor(private routeBuilder: RouteBuilder) {
    }

    get urlPrefix(): string {
        return this.routeBuilder.prefix;
    }
}
