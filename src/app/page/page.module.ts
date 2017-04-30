import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AuthorComponent} from "./author/author.component";
import {ModelModule} from "../model/model.module";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {PageNotFoundComponent} from "./page-not-found.component";

export const APP_ROUTES: Routes = [
    {path: '', loadChildren: 'app/page/home/home.module#HomeModule'},
    {path: 'author', component: AuthorComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [BrowserModule, ModelModule, SharedModule, RouterModule.forRoot(APP_ROUTES)],
    declarations: [AuthorComponent, PageNotFoundComponent],
})
export class PageModule {
}
