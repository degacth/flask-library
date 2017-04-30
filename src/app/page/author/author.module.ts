import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthorComponent} from "./author.component";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";

let routes = [
    {path: '', component: AuthorComponent},
];

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
    declarations: [AuthorComponent],
})
export class AuthorModule {
}
