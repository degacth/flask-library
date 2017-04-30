import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    moduleId: module.id,
})
export class AppComponent {
    main_menu = [
        {path: ['author'], title: 'Authors'},
        {path: ['book'], title: 'Books'},
    ]
}
