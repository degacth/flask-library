import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ModelModule} from "../model/model.module";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {PageNotFoundComponent} from "./page-not-found.component";

export const APP_ROUTES: Routes = [
    {path: '', loadChildren: 'app/page/home/home.module#HomeModule'},
    {path: 'author', loadChildren: 'app/page/author/author.module#AuthorModule'},
    {path: 'book', loadChildren: 'app/page/book/book.module#BookModule'},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [BrowserModule, ModelModule, SharedModule, RouterModule.forRoot(APP_ROUTES)],
    declarations: [PageNotFoundComponent],
})
export class PageModule {
}
