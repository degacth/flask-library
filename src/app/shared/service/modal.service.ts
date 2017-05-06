import {Injectable} from "@angular/core";
declare var UIkit: any;

@Injectable()
export class Modal {
    private modal: any;
    private options = {
        center: true,
    };

    constructor() {
        this.modal = UIkit.modal;
    }

    alert(message: string) {
        this.modal.alert(message, this.options);
    }

    confirm(message: string, cb: () => void) {
        this.modal.confirm(message, cb, this.options);
    }
}
