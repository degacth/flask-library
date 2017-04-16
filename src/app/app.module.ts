import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import {APP_BASE_HREF} from '@angular/common'

import {AppComponent}  from './app.component';
import {HomeModule} from './home/home.module';
import {HomeComponent} from "./home/home.component";
import {Settings} from "./app.settings";
import {AuthorComponent} from "./author/author.component";
import {AuthorModule} from "./author/author.module";

@NgModule({
    imports: [BrowserModule, HomeModule, AuthorModule,
        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: 'author', component: AuthorComponent},
            {path: '**', redirectTo: '/home'},
        ])
    ],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, Settings],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
