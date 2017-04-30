import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";

let routes = [
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule,],
    declarations: [HomeComponent],
})
export class HomeModule {
}
