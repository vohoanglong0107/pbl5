import { Request, Response, NextFunction, response } from 'express';
import RuleRepo from '../repository/rule';
import { ok, err } from '../util/response';

export default class RuleCtrl {

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            await RuleRepo.create({ data: req.body });
            ok(200, "success", null, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await RuleRepo.getAll();
            // new Responses().ok(200, "success", result, res)
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            // new Responses().error(400, "bad request", res)
            err(400, "bad request", res)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const result = await RuleRepo.getByID(Number(req.params.id));
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const result = await RuleRepo.updateByID(Number(req.params.id), req.body);
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const result = await RuleRepo.deleteByID(Number(req.params.id));
            ok(200, "success", null, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

}