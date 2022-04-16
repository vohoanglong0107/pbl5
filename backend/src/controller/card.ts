import { Request, Response, NextFunction, response } from 'express';
import CardRepo from '../repository/card';
import { ok, err } from '../util/response';

export default class CardCtrl {

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            await CardRepo.create({ data: req.body });
            ok(200, "success", null, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await CardRepo.getAll();
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const result = await CardRepo.getByID(Number(req.params.id));
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const result = await CardRepo.updateByID(Number(req.params.id), req.body);
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const result = await CardRepo.deleteByID(Number(req.params.id));
            ok(200, "success", null, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

}