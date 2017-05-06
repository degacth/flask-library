import {Component, OnInit} from "@angular/core";
import {Author, AuthorRepository} from "../../model/entity/author.model";
import {IPaginator} from "../../model/paginator.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Modal} from "../../shared/service/modal.service";
import * as _ from "lodash";
import {RouteBuilder} from "../../shared/service/route-builder.service";

@Component({
    selector: 'author',
    moduleId: module.id,
    templateUrl: 'author-list.component.html',
})
export class AuthorListComponent implements OnInit {
    constructor(private repo: AuthorRepository, private route: ActivatedRoute, private router: Router,
                private modal: Modal, private routeBuilder: RouteBuilder) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => this.repo.loadAuthors(params['id']));
    }

    get authors(): Author[] {
        return this.repo.getAuthors()
    }

    get paginatorResource(): IPaginator {
        return this.repo.paginator
    }

    get pageInfo() {
        return {
            'page': this.repo.paginator.getPage(),
            'numPage': this.repo.paginator.getPage(),
            'pages': this.repo.paginator.getTotalPages(),
        }
    }

    pageChanged(page: number): void {
        this.router.navigate([this.routeBuilder.prefix, 'list', page])
    }

    getEditLink(id: number): any[] {
        return [this.routeBuilder.prefix, 'form', id]
    }

    remove(id: number): void {
        this.modal.confirm(`Do you wonna remove author #${id}?`, () => this.repo.remove(id).subscribe(() => {
            this.authors.splice(_.findIndex(this.authors, {author_id: id}), 1);
        }))
    }
}
