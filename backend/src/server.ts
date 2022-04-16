import { Application, urlencoded, json } from 'express';
import Routes from './route/route';

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    public config(app: Application): void {
        app.use(urlencoded({ extended: true }));
        app.use(json());
    }
}
