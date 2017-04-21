import {Observable} from "rxjs";

export abstract class DataSource<Entity> {
    abstract select: (from: string) => Observable<Entity>;
    // update: (entity: Entity) => Entity
    // insert: (entity: Entity) => Entity
    // remove: (entity: Entity) => void
}
