import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DataSource} from "../data.source";

export class Statistics {
    book_count: number;
    author_count: number;
}

@Injectable()
export class StatisticsRepository {
    private statistics: Statistics;

    constructor(private source: DataSource<Statistics>) {
        this.loadStatistics().subscribe(data => this.statistics = data);
    }

    getStatistics: () => Statistics = () => this.statistics;

    private loadStatistics: () => Observable<Statistics> =
        () => this.source.select('statistics')
}
