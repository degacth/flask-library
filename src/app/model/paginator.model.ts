export interface IPaginator {
    getNumResults: () => number
    getObjects: <T>() => T[]
    getPage: () => number
    setPage: (p: number) => void
    getTotalPages: () => number
    updatePage: (data: Object) => void
}

export class RestlessPaginator<T> implements IPaginator{
    private num_results: number = 0;
    private objects: T[] = [];
    private page: number = 0;
    private total_pages: number = 0;

    getNumResults = () => this.num_results;
    getObjects = () => this.objects;
    getTotalPages = () => this.total_pages;
    updatePage = (data: Object) => Object.assign(this, data);

    getPage = () => this.page;
    setPage = (page: number) => this.page = page;
}

export class Paginator<T> extends RestlessPaginator<T> implements IPaginator {
}
