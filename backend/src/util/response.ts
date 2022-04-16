import { Response } from "express";

export function ok(status: number, message: string, data: any, res: Response) {
    return res.status(status).json({
        status,
        message,
        data
    });
};

export function err(status: number, message: string, res: Response) {
    return res.status(status).json({
        status,
        message,
    });
};