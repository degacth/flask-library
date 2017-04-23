import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common'

import {AppComponent}  from './app.component';
import {Settings} from "./app.settings";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "./component/component.module";

@NgModule({
    imports: [BrowserModule, RouterModule, ComponentModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, Settings],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
