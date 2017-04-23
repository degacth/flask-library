import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthorComponent} from "./author/author.component";

export const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'author', component: AuthorComponent},
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: '**', component: HomeComponent}, // TODO -> PageNotFoundComponent
];
