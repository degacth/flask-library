import {NgModule} from "@angular/core";
import {Paginator} from "./component/paginator.component";
import {CommonModule} from "@angular/common";
import {Modal} from "./service/modal.service";

@NgModule({
    imports: [CommonModule],
    declarations: [Paginator],
    exports: [Paginator],
    providers: [Modal],
})
export class SharedModule {
}