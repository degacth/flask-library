import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class RouteBuilder {
    prefix: string;

    constructor(private route: ActivatedRoute) {
        this.prefix = this.getNearestParentPath(this.route)
    }

    private getNearestParentPath(route: ActivatedRoute = null): string {
        if (!route.parent.routeConfig) return '/';

        let path: string = route.parent.routeConfig.path;
        if (path) return `/${path}`;

        return this.getNearestParentPath(route.parent)
    };
}
