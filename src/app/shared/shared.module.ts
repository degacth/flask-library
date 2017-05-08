import {NgModule} from "@angular/core";
import {Paginator} from "./component/paginator.component";
import {CommonModule} from "@angular/common";
import {Modal} from "./service/modal.service";
import {ButtonsComponent} from "./component/buttons.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Paginator, ButtonsComponent],
    exports: [Paginator, ButtonsComponent, CommonModule, RouterModule],
    providers: [Modal],
})
export class SharedModule {
}