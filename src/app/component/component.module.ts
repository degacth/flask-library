import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthorComponent} from "./author/author.component";
import {ModelModule} from "../model/model.module";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [BrowserModule, ModelModule, RouterModule.forRoot([
        {path: 'home', component: HomeComponent},
        {path: 'author', component: AuthorComponent},
        {path: '**', redirectTo: '/home'},
    ])],
    declarations: [AuthorComponent, HomeComponent],
    exports: [HomeComponent]
})
export class ComponentModule {
}
