import {ActivatedRoute} from "@angular/router";
export let getNearestParentPath: (route: ActivatedRoute) => string =
    (route) => {
        if (!route.parent.routeConfig) return '/';

        let path: string = route.parent.routeConfig.path;
        if (path) return `/${path}`;

        return getNearestParentPath(route.parent)
    };
