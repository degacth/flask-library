import {NgModule} from "@angular/core";
import {Paginator} from "./component/paginator.component";
import {CommonModule} from "@angular/common";
import {Modal} from "./service/modal.service";
import {ListModule} from "./component/list/list.module";

@NgModule({
    imports: [CommonModule, ListModule],
    declarations: [Paginator],
    exports: [ListModule, Paginator],
    providers: [Modal],
})
export class SharedModule {
}