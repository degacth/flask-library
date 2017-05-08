import {Injectable, ModuleWithProviders, NgModule} from "@angular/core";
import {SharedModule} from "../../shared.module";
import {BaseComponent} from "./base.component";
import {BaseConfig, IBaseConfig} from "./base-config.service";

@NgModule({
    imports: [SharedModule],
    declarations: [BaseComponent],
    exports: [BaseComponent],
    providers: [{provide: BaseConfig, useValue: null}]
})
export class BaseModule {
    static forChild(config: IBaseConfig): ModuleWithProviders {
        return {
            ngModule: BaseModule,
            providers: [{provide: BaseConfig, useValue: config}]
        }
    }
}
