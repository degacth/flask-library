import {Component, Input} from "@angular/core";
import {IPaginator} from "../../model/paginator.model";

@Component({
    moduleId: module.id,
    selector: 'paginator',
    templateUrl: 'paginator.component.html'
})
export class Paginator {
    @Input('resource')
    paginatorResource: IPaginator;
}