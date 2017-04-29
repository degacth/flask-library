import {Component, Input} from "@angular/core";
import {IPaginator} from "../../model/paginator.model";
import * as _ from "lodash";

@Component({
    moduleId: module.id,
    selector: 'paginator',
    templateUrl: 'paginator.component.html'
})
export class Paginator {
    @Input('resource')
    resource: IPaginator;

    getPages: () => Page[] = () => {
        let activePage: number = this.resource.getPage();
        let totalPages: number = this.resource.getTotalPages();
        let minPage: number = 1;
        let pages: number[] = _.uniq([
            Math.max(minPage, activePage - 1),
            activePage,
            Math.min(totalPages, activePage + 1),
        ]);

        // set bounds and separators
        let pageSeparator: number = 0;
        if (_.head(pages) != minPage) pages = _.concat([minPage, pageSeparator], pages);
        if (_.last(pages) != totalPages ) pages = _.concat(pages, [pageSeparator, totalPages]);

        return _.concat(
            _.map(pages, page => new Page(page, page === activePage)),
        )
    }
}

class Page {
    isLink: boolean;
    label: string;

    constructor(public position: number, public isActive: boolean) {
        this.isLink = position && !isActive;
        this.label = (position || '...') as string;
    }
}
