import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthorListComponent} from "./author-list.component";
import {AuthorBaseComponent} from "./author-base.component";
import {SharedModule} from "../../shared/shared.module";
import {AuthorForm} from "./author-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ListModule} from "../../shared/component/list/list.module";


let routes = [
    {
        path: '', component: AuthorBaseComponent,
        children: [
            {path: 'list/:id', component: AuthorListComponent},
            {path: 'form/:id', component: AuthorForm},
            {path: 'form', component: AuthorForm},
            {path: '**', redirectTo: 'list/1'},
        ]
    },
];

@NgModule({
    imports: [ReactiveFormsModule, SharedModule, RouterModule.forChild(routes), ListModule],
    declarations: [AuthorListComponent, AuthorForm, AuthorBaseComponent],
})
export class AuthorModule {
}
