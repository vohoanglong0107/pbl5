import { Application } from 'express';
import DeckRouter from './deck';
import CardRouter from './card';
import RuleRouter from './rule';

export default class Routes {
    constructor(app: Application) {
        // deck router
        app.use('/api/deck', DeckRouter);
        // card router
        app.use('/api/card', CardRouter);
        // rule router
        app.use('/api/rule', RuleRouter);
    }
}