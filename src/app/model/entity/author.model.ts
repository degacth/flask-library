import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IRestDataSource, RestDataSource} from "../rest.datasource";
import {Paginator} from "../paginator.model";

export class Author {
    author_id: number;
    name: string;
}

@Injectable()
export class AuthorRepository {
    paginator: Paginator<Author> = new Paginator<Author>();

    constructor(@Inject(RestDataSource) private source: IRestDataSource) {
        this.loadAuthors().subscribe(data => {
            this.paginator.updatePage(data);
        })
    }

    private loadAuthors: () => Observable<Paginator<Author>> =
        () => this.source.get<Paginator<Author>>(['author']);

    getAuthors: () => Author[] = () => this.paginator.getObjects();
}