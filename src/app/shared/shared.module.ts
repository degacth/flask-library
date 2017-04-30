import {NgModule} from "@angular/core";
import {Paginator} from "./component/paginator.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [Paginator],
    exports: [Paginator]
})
export class SharedModule {
}