import {Injectable} from "@angular/core";
import {Http, RequestMethod, Request} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

const PROTOCOL = 'http';
const PORT = 5000;

@Injectable()
export class RestDataSource<T> {
    private baseUrl: string;

    constructor(private http: Http) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api`;
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
