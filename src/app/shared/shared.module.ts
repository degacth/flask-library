import {NgModule} from "@angular/core";
import {Paginator} from "./component/paginator.component";
import {CommonModule} from "@angular/common";
import {Modal} from "./service/modal.service";
import {ButtonsComponent} from "./component/buttons.component";
import {RouterModule} from "@angular/router";
import {BaseComponent} from "./component/base/base.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Paginator, ButtonsComponent, BaseComponent],
    exports: [Paginator, ButtonsComponent, BaseComponent, CommonModule],
    providers: [Modal],
})
export class SharedModule {
}