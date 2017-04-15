import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./home.component";
import {ModelModule} from "../model/model.module";

@NgModule({
    imports: [ModelModule, BrowserModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {
}
