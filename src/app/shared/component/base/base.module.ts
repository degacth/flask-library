import {Injectable, NgModule} from "@angular/core";
import {SharedModule} from "../../shared.module";
import {BaseComponent} from "./base.component";

@NgModule({
    imports: [SharedModule],
    declarations: [BaseComponent],
    exports: [BaseComponent],
})
export class BaseModule {
}
