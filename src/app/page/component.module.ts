import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthorComponent} from "./author/author.component";
import {ModelModule} from "../model/model.module";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

export const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'author', component: AuthorComponent},
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: '**', component: HomeComponent}, // TODO -> PageNotFoundComponent
];

@NgModule({
    imports: [BrowserModule, ModelModule, SharedModule, RouterModule.forRoot(APP_ROUTES)],
    declarations: [AuthorComponent, HomeComponent],
    exports: [HomeComponent]
})
export class ComponentModule {
}
