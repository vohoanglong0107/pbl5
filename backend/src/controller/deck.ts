import { Request, Response, NextFunction, response } from 'express';
import DeckRepo from '../repository/deck';
import { ok, err } from '../util/response';

export default class DeckCtrl {

    constructor() { }

    async create(req: Request, res: Response) {
        try {
            await DeckRepo.create({ data: req.body });
            ok(200, "success", null, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await DeckRepo.getAll();
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const result = await DeckRepo.getByID(Number(req.params.id));
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const result = await DeckRepo.updateByID(Number(req.params.id), req.body);
            ok(200, "success", result, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const result = await DeckRepo.deleteByID(Number(req.params.id));
            ok(200, "success", null, res)
        } catch (error) {
            console.log(error)
            err(400, "bad request", res)
        }
    }

}