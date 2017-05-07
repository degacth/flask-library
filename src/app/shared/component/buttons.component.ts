import {Component, Input} from "@angular/core";
import * as _ from "lodash";

export enum Color {
    PRIMARY,
    SUCCESS,
    DANGER,
}

export interface IButton {
    icon?: string,
    text?: string,
    klass?: string,
    click?: (obj: any) => void,
    link?: (obj: any) => string[],
    color?: Color,
}

@Component({
    selector: 'buttons',
    moduleId: module.id,
    templateUrl: 'buttons.component.html',
})
export class ButtonsComponent {
    @Input() buttons: IButton[];
    @Input() object: {};

    getButtonClass(config: IButton): string {
        let klass = ['uk-button'];
        if (_.isNumber(config.color)) klass.push(`uk-button-${Color[config.color].toLowerCase()}`);
        if (config.klass) klass.push(config.klass);
        return klass.join(' ');
    }

    getIconClass(icon: string): string {
        let klass = '';
        if (icon) klass += `uk-icon-${icon}`;
        return klass;
    }
}
