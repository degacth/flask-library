import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {AuthorRepository} from "./entity/author.model";
import {StatisticsRepository} from "./entity/statistics.model";
import {RestDataSource, RestlessDataSource} from "./rest.datasource";

@NgModule({
    imports: [HttpModule],
    providers: [StatisticsRepository, AuthorRepository,
        {provide: RestDataSource, useClass: RestlessDataSource},
    ]
})
export class ModelModule {
}
