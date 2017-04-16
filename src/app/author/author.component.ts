import {Component} from "@angular/core";
import {Author} from "../model/author.model";
import {AuthorRepository} from "../model/author.repository";

@Component({
    selector: 'author',
    moduleId: module.id,
    templateUrl: 'author.component.html'
})
export class AuthorComponent {
    constructor(private authorRep: AuthorRepository) {}

    get authors(): Author[] {
        return this.authorRep.getAuthors()
    }

    get pageInfo() {
        return {
            'page': this.authorRep.page,
            'numPage': this.authorRep.num_results,
            'pages': this.authorRep.total_pages,
        }
    }
}
