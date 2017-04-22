import {Injectable, InjectionToken} from "@angular/core";
import {Http, RequestMethod, Request} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import {Settings} from "../app.settings";

export interface IRestDataSource {
    get: <T>(url: string[]) => Observable<T>
    // post: any
    // put: any
    // patch: any
    // del: any
}

export const RestDataSource = new InjectionToken('restdatasource');

@Injectable()
export class RestlessDataSource implements IRestDataSource {
    private baseUrl: string;

    constructor(private http: Http, private settings: Settings) {
        this.baseUrl = `${settings.HOSTNAME}/api`;
    }

    get: <T>(url: string[]) => Observable<T> =
        (url: string[]) => this.sendRequest(RequestMethod.Get, url);

    private sendRequest<T>(verb: RequestMethod, url: string[], body?: any): Observable<T> {
        let request = new Request({
            method: verb,
            url: `${this.baseUrl}/${url.join('/')}`,
            body: body,
        });

        return this.http.request(request).map(response => response.json())
    }
}
