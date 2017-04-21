import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RestDataSource} from "./rest.datasource";
import {AuthorRepository} from "./entity/author.model";
import {StatisticsRepository} from "./entity/statistics.model";
import {DataSource} from "./data.source";

@NgModule({
    imports: [HttpModule],
    providers: [StatisticsRepository, AuthorRepository,
        {provide: DataSource, useClass: RestDataSource},
    ]
})
export class ModelModule {
}
