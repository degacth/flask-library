import {Injectable} from "@angular/core";
import {Author} from "./author.model";
import {RestDataSource, RestlessData} from "./rest.datasource";
import {Observable} from "rxjs";
import {RequestMethod} from "@angular/http";

@Injectable()
export class AuthorRepository extends RestlessData<Author>{
    constructor(private source: RestDataSource<RestlessData<Author>>) {
        super();
        this.loadAuthors().subscribe(data => {
            Object.assign(this, data)
        })
    }

    private loadAuthors: () => Observable<RestlessData<Author>> =
        () => this.source.sendRequest(RequestMethod.Get, '/author');

    getAuthors: () => Author[] = () => this.objects;


}
