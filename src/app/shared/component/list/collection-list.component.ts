import {Component, Input} from "@angular/core";

export interface ICollectionList {
    getCollection: () => Array<Object>;
    getFields: () => string[];
    getLabel: () => string;
}

@Component({
    selector: 'collection-list',
    moduleId: module.id,
    templateUrl: 'collection-list.component.html',
})
export class CollectionListComponent {
    @Input('collection')
    collection: ICollectionList;
}
