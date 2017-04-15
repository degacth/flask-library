import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./home.component";
import {ModelModule} from "../model/model.module";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [ModelModule, BrowserModule, RouterModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {
}
