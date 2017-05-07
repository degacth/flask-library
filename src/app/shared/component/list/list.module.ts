import {NgModule} from "@angular/core";
import {CollectionListComponent} from "./collection-list.component";
import {SharedModule} from "../../shared.module";

@NgModule({
    imports: [SharedModule],
    declarations: [CollectionListComponent],
    exports: [CollectionListComponent],
})
export class ListModule {
}
