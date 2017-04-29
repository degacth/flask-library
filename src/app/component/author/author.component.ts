import {Component} from "@angular/core";
import {Author, AuthorRepository} from "../../model/entity/author.model";
import {IPaginator} from "../../model/paginator.model";

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

    get paginatorResource(): IPaginator {
        return this.authorRep.paginator
    }

    get pageInfo() {
        return {
            'page': this.authorRep.paginator.getPage(),
            'numPage': this.authorRep.paginator.getPage(),
            'pages': this.authorRep.paginator.getTotalPages(),
        }
    }
}
