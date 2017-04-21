import {Injectable} from "@angular/core";
import {Http, RequestMethod, Request} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {Settings} from "../app.settings";
import {DataSource} from "./data.source";

@Injectable()
export class RestDataSource<T> implements DataSource<T> {
    private baseUrl: string;
    select = (from: string) => this.sendRequest(RequestMethod.Get, from);

    constructor(private http: Http, private settings: Settings) {
        this.baseUrl = `${settings.HOSTNAME}/api`;
    }

    private sendRequest(verb: RequestMethod, url: string, body?: any): Observable<T> {
        let request = new Request({
            method: verb,
            url: `${this.baseUrl}/${url}`,
            body: body,
        });

        return this.http.request(request).map(response => response.json())
    }
}
