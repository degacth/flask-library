import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IRestDataSource, RestDataSource} from "../rest.datasource";

export class Statistics {
    book_count: number;
    author_count: number;
}

@Injectable()
export class StatisticsRepository {
    private statistics: Statistics;

    constructor(@Inject(RestDataSource) private source: IRestDataSource) {
        this.loadStatistics().subscribe(data => this.statistics = data);
    }

    getStatistics: () => Statistics = () => this.statistics;

    private loadStatistics: () => Observable<Statistics> =
        () => this.source.get<Statistics>(['statistics'])
}
