import {NgModule} from "@angular/core";
import {Paginator} from "./component/paginator.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [BrowserModule],
    declarations: [Paginator],
    exports: [Paginator]
})
export class SharedModule {
}