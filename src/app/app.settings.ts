import {Injectable} from "@angular/core";

let lcn = location;

@Injectable()
export class Settings {
    HOSTNAME = `${lcn.protocol}//${lcn.host}`
}
