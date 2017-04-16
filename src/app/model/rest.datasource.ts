import {Injectable} from "@angular/core";
import {Http, RequestMethod, Request} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {Settings} from "../app.settings";

@Injectable()
export class RestDataSource<T> {
    private baseUrl: string;

    constructor(private http: Http, private settings: Settings) {
        this.baseUrl = `${settings.HOSTNAME}/api`;
    }

    sendRequest(verb: RequestMethod, url: string, body?: any): Observable<T> {
        let request = new Request({
            method: verb,
            url: this.baseUrl + url,
            body: body,
        });

        return this.http.request(request).map(response => response.json())
    }
}

export class RestlessData<T> {
    objects: T[];
    num_results: number;
    page: number;
    total_pages: number;
}
