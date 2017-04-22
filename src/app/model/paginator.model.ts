export interface Paginator<T> {
    getNumResults: () => number
    getObjects: () => T[]
    getPage: () => number
    getTotalPages: () => number
}

export class RestlessPaginator<T> implements Paginator<T>{
    private num_results: number;
    private objects: T[];
    private page: number;
    private total_pages: number;

    getNumResults = () => this.num_results;
    getObjects = () => this.objects;
    getPage = () => this.page;
    getTotalPages = () => this.total_pages;
}