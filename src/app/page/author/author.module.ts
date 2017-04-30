import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthorListComponent} from "./author-list.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";

let routes = [
    {path: 'list/:id', component: AuthorListComponent},
    {path: '**', redirectTo: 'list/1'},
];

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
    declarations: [AuthorListComponent],
})
export class AuthorModule {
}
