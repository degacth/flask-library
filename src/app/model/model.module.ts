import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {StatisticsRepository} from "./statistics.repository";
import {RestDataSource} from "./rest.datasource";
import {AuthorRepository} from "./author.repository";

@NgModule({
    imports: [HttpModule],
    providers: [StatisticsRepository, RestDataSource, AuthorRepository]
})
export class ModelModule {
}
