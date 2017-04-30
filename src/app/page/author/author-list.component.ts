import {Component, OnInit} from "@angular/core";
import {Author, AuthorRepository} from "../../model/entity/author.model";
import {IPaginator} from "../../model/paginator.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'author',
    moduleId: module.id,
    templateUrl: 'author-list.component.html'
})
export class AuthorListComponent implements OnInit {
    constructor(private authorRep: AuthorRepository, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.authorRep.loadAuthors(params['id']))
    }

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

    pageChanged(page: number) {
        this.router.navigate([this.route.parent.routeConfig.path, 'list', page])
    }
}
