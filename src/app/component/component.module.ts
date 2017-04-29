import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthorComponent} from "./author/author.component";
import {ModelModule} from "../model/model.module";
import {HomeComponent} from "./home/home.component";
import {APP_ROUTES} from "./component.routes";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [BrowserModule, ModelModule, SharedModule, RouterModule.forRoot(APP_ROUTES)],
    declarations: [AuthorComponent, HomeComponent],
    exports: [HomeComponent]
})
export class ComponentModule {
}
