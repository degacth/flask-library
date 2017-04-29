import {Component, Input} from "@angular/core";
import {IPaginator} from "../../model/paginator.model";

@Component({
    moduleId: module.id,
    selector: 'paginator',
    templateUrl: 'paginator.component.html'
})
export class Paginator {
    @Input('resource')
    resource: IPaginator;

    getPages: () => number[] = () => {
        return [1, 2, 3];
    }
}