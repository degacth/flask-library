import {InjectionToken} from "@angular/core";

export const BaseConfig = new InjectionToken('restdatasource');

export interface IMenuItem {
    link: string[],
    text: string,
    klass: string,
}

export interface IBaseConfig {
    getMenu: () => IMenuItem[];
    getMenuLabel: () => string;
}
