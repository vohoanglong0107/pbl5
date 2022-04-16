import * as Joi from 'joi';
import { Request, Response, NextFunction, json } from 'express';
import { err } from '../util/response';
import { string } from 'joi';

interface DeckRequest extends Request {
    value?: { body?: string };
}

export class DeckVal {

    constructor() { }

    validateBody(schema: any) {
        return async (req: DeckRequest, res: Response, next: NextFunction) => {
            try {
                const val = await schema.validateAsync(req.body);
                req.value = req.value ?? {};
                req.value.body = req.value.body ?? val;
                next();
            } catch (error) {
                if (error instanceof Error) {
                    err(400, error.message, res)
                }
            }
        };
    }
}

export const deckSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
});