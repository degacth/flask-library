import {Injectable} from "@angular/core";
declare var UIkit: any;

@Injectable()
export class Modal {
    static alert(message: string) {
        UIkit.modal.alert(message);
    }

    static confirm(message: string, cb: any) {
        UIkit.modal.confirm(message, cb)
    }
}