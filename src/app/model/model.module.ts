import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RestDataSource} from "./rest.datasource";
import {AuthorRepository} from "./entity/author.model";
import {StatisticsRepository} from "./entity/statistics.model";

@NgModule({
    imports: [HttpModule],
    providers: [StatisticsRepository, RestDataSource, AuthorRepository]
})
export class ModelModule {
}
