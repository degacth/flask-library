import {Component, Input} from "@angular/core";

enum Color {
    PRIMARY,
    SUCCESS,
    DANGER,
}

export interface IButton {
    icon?: string,
    text?: string,
    click?: (obj: any) => void,
    link?: string[],
    color?: Color,
}

@Component({
    selector: 'buttons',
    moduleId: module.id,
    templateUrl: 'buttons.component.html',
})
export class ButtonsComponent {
    @Input() buttons: IButton[];
}
