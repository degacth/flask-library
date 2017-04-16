import {Injectable} from "@angular/core";
import {Author} from "./author.model";
import {RestDataSource} from "./rest.datasource";
import {Observable} from "rxjs";
import {RequestMethod} from "@angular/http";

@Injectable()
export class AuthorRepository {
    private authors: Author[];

    constructor(private source: RestDataSource<Author[]>) {
        this.loadAuthors().subscribe(data => this.authors = data)
    }

    private loadAuthors: () => Observable<Author[]> =
        () => this.source.sendRequest(RequestMethod.Get, '/author');

    getAuthors: () => Author[] = () => this.authors
}
