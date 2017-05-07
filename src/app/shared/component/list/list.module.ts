import {NgModule} from "@angular/core";
import {CollectionListComponent} from "./collection-list.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [CollectionListComponent],
    exports: [CollectionListComponent],
})
export class ListModule {

}
