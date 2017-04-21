import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RequestMethod} from "@angular/http";
import {DataSource} from "../data.source";

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

    constructor(private source: DataSource<Author>) {
        this.loadAuthors().subscribe(data => {
            Object.assign(this, data)
        })
    }

    private loadAuthors: () => Observable<Author> =
        () => this.source.select('author');

    getAuthors: () => Author[] = () => this.objects;
}