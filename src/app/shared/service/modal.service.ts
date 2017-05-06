import {Injectable} from "@angular/core";
declare var UIkit: any;

let modal = UIkit.modal;
let options = {
    center: true,
};

@Injectable()
export class Modal {
    alert(message: string) {
        modal.alert(message, options);
    }

    confirm(message: string, cb: () => void) {
        modal.confirm(message, cb, options);
    }
}
