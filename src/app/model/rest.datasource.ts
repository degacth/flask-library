import {Injectable, InjectionToken} from "@angular/core";
import {Http, RequestMethod, Request} from "@angular/http";
import {Observable} from "rxjs";
import * as _ from "lodash";
import "rxjs/add/operator/map";
import {Settings} from "../app.settings";

export interface IRestDataSource {
    get: <T>(url: (string | Object)[]) => Observable<T>
    put: <T>(url: string[], object: T) => Observable<T>
    post: <T>(url: string[], object: T) => Observable<T>
    del: (url: string[]) => Observable<any>
    // patch: any
}

export const RestDataSource = new InjectionToken('restdatasource');

@Injectable()
export class RestlessDataSource implements IRestDataSource {
    private baseUrl: string;

    constructor(private http: Http, private settings: Settings) {
        this.baseUrl = `${settings.HOSTNAME}/api`;
    }

    get<T>(url: (string | Object)[]): Observable<T> {
        let urlPath: string = RestlessDataSource.getPath(url);
        let urlQuery: string = RestlessDataSource.makeQueryFromObject(_.find(url, item => typeof item === 'object'));
        return this.sendRequest(RequestMethod.Get, `${urlPath}?${urlQuery}`);
    };

    put<T>(url: string[], body: T): Observable<T> {
        return this.sendRequest<T>(RequestMethod.Put, RestlessDataSource.getPath(url), body);
    }

    post<T>(url: string[], body: T): Observable<T> {
        return this.sendRequest<T>(RequestMethod.Post, RestlessDataSource.getPath(url), body);
    }

    del(url: string[]): Observable<any> {
        return this.sendRequest<any>(RequestMethod.Delete, RestlessDataSource.getPath(url));
    }

    private sendRequest<T>(verb: RequestMethod, url: string, body?: any): Observable<T> {
        let request = new Request({
            method: verb,
            url: `${this.baseUrl}/${url}`,
            body: body,
        });

        return this.http.request(request).map(response => <T>response.json())
    }

    private static getPath(url: any[]): string {
        return _.filter(url, item => typeof item !== 'object').join('/');
    }

    private static makeQueryFromObject(obj: Object): string {
        return _.map(_.toPairs(obj), kv => `${kv[0]}=${kv[1]}`).join('&')
    }
}
