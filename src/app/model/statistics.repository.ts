import {Injectable} from "@angular/core";
import {Statistics} from "./statistics.model";
import {RestDataSource} from "./rest.datasource";
import {RequestMethod} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class StatisticsRepository {
    private statistics: Statistics;
    constructor(private source: RestDataSource<Statistics>) {
        this.loadStatistics().subscribe(data => this.statistics = data);
    }

    getStatistics: () => Statistics = () => this.statistics;

    private loadStatistics: () => Observable<Statistics> =
        () => this.source.sendRequest(RequestMethod.Get, '/statistics')
}
