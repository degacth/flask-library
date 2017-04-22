import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IRestDataSource, RestDataSource} from "../rest.datasource";

export class Author {
    author_id: number;
    name: string;
}

@Injectable()
export class AuthorRepository {
    objects: Author[];
    page: number;
    num_results: number;
    total_pages: number;

    constructor(@Inject(RestDataSource) private source: IRestDataSource) {
        this.loadAuthors().subscribe(data => {
            Object.assign(this, data)
        })
    }

    private loadAuthors: () => Observable<Author> =
        () => this.source.get<Author>(['author']);

    getAuthors: () => Author[] = () => this.objects;
}