import {Component} from "@angular/core";
import {StatisticsRepository} from "../model/statistics.repository";
import {Statistics} from "../model/statistics.model";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.component.html',
})
export class HomeComponent {
    constructor(private statisticsRep: StatisticsRepository) {
    }

    get statistics(): Statistics { return this.statisticsRep.getStatistics() }
}