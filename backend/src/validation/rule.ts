import * as Joi from 'joi';
import { Request, Response, NextFunction, json } from 'express';
import { err } from '../util/response';

interface RuleRequest extends Request {
    value?: { body?: string };
}

export class RuleVal {

    constructor() { }

    validateBody(schema: any) {
        return async (req: RuleRequest, res: Response, next: NextFunction) => {
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

export const ruleSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
});