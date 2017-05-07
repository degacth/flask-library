import {Component, Input, OnInit} from "@angular/core";
import {IButton} from "../buttons.component";

export interface ICollectionList {
    getCollection: () => Array<Object>;
    getFields: () => string[];
    getLabel: () => string;
    getButtons?: () => IButton[];
}

@Component({
    selector: 'collection-list',
    moduleId: module.id,
    templateUrl: 'collection-list.component.html',
})
export class CollectionListComponent implements OnInit {
    @Input('collection')
    collection: ICollectionList;

    ngOnInit(): void {
    }
}
