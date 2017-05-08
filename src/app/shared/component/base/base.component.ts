import {Component, Inject} from "@angular/core";
import {RouteBuilder} from "../../service/route-builder.service";
import {BaseConfig, IBaseConfig, IMenuItem} from "./base-config.service";
import * as _ from "lodash";

@Component({
    selector: 'author-base',
    moduleId: module.id,
    templateUrl: 'base.component.html',
    providers: [RouteBuilder],
})
export class BaseComponent {
    menuItems: IMenuItem[];
    menuLabel: string;

    constructor(private routeBuilder: RouteBuilder, @Inject(BaseConfig) private config: IBaseConfig) {
        this.menuItems = _.map(config.getMenu(), (item: IMenuItem) => {
            item.link = _.concat([this.routeBuilder.prefix], item.link);
            return item
        });

        this.menuLabel = config.getMenuLabel()
    }
}
