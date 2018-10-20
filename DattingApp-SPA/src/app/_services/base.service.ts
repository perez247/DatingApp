
export class BaseService {
    private url = 'http://localhost:5000/';

    constructor() {}

    protected get baseUrl() {
        return this.url;
    }
}
