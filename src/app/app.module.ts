import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import {APP_BASE_HREF} from '@angular/common'

import {AppComponent}  from './app.component';
import {HomeModule} from './home/home.module';
import {HomeComponent} from "./home/home.component";
import {Settings} from "./app.settings";

@NgModule({
    imports: [BrowserModule, HomeModule,
        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: '**', redirectTo: '/home'},
        ])
    ],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, Settings],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
