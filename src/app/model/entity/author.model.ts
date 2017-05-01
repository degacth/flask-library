import {Inject, Injectable, OnInit} from "@angular/core";
import {IRestDataSource, RestDataSource} from "../rest.datasource";
import {Paginator} from "../paginator.model";
import {Observable} from "rxjs/Observable";

export class Author {
    author_id: number;
    name: string;
}

@Injectable()
export class AuthorRepository {
    paginator: Paginator<Author> = new Paginator<Author>();

    constructor(@Inject(RestDataSource) private source: IRestDataSource) {
    }

    loadAuthors: (page: number) => void =
        (page = 1) => this.source.get<Paginator<Author>>(['author', {page: page}]).subscribe(data => {
            this.paginator.updatePage(data);
        });

    getAuthors: () => Author[] = () => this.paginator.getObjects();
    getAuthor: (id: number) => Observable<Author> = (id) => this.source.get<Author>(['author', id]);
    update: (author: Author) => Observable<Author> = (author) => this.source.put(['author', author.author_id], author)
}
