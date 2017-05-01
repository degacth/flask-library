import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {getNearestParentPath} from "./utils";

@Component({
    selector: 'author-base',
    moduleId: module.id,
    templateUrl: 'author-base.component.html',
})
export class AuthorBaseComponent implements OnInit {
    parentPath: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.parentPath = getNearestParentPath(this.route);
    }
}
