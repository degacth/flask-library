import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {BaseComponent} from "../../shared/component/base/base.component";
import {BaseModule} from "../../shared/component/base/base.module";

const routes = [
    {
        path: '', component: BaseComponent,
        children: [
            {path: 'list/:page'},
            {path: 'form/:id'},
            {path: 'form'},
            {path: '**', redirectTo: 'list/1'},
        ]
    }
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes), BaseModule]
})
export class BookModule {
}
