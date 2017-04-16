import {Component} from "@angular/core";
import {Author} from "../model/author.model";
import {AuthorRepository} from "../model/author.repository";

@Component({
    selector: 'author',
    moduleId: module.id,
    templateUrl: 'author.component.html'
})
export class AuthorComponent {
    constructor(private productRep: AuthorRepository) {}

    get authors(): Author[] {
        console.log(this.productRep.getAuthors())
        return this.productRep.getAuthors()
    }
}
