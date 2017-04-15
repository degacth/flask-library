import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {Statistics} from "./statistics.model";
import {StatisticsRepository} from "./statistics.repository";
import {RestDataSource} from "./rest.datasource";

@NgModule({
    imports: [HttpModule],
    providers: [StatisticsRepository, RestDataSource]
})
export class ModelModule {
}
