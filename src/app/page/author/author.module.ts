import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthorListComponent} from "./author-list.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {AuthorForm} from "./author-form.component";
import {ReactiveFormsModule} from "@angular/forms";

let routes = [
    {path: 'list/:id', component: AuthorListComponent},
    {path: 'form/:id', component: AuthorForm},
    {path: '**', redirectTo: 'list/1'},
];

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, SharedModule, RouterModule.forChild(routes)],
    declarations: [AuthorListComponent, AuthorForm],
})
export class AuthorModule {
}
