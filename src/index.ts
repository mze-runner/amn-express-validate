import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from '@hapi/joi';
import { error } from 'amn-error';

export const validate = (
    schema: ObjectSchema,
    container: 'body' | 'query' | 'params'
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req[container];
            const { error: validationError } = await schema.validate(input);
            const valid = validationError == null;
            if (valid) {
                return next();
            }
            const { details } = validationError!;
            const message = details.map((i) => i.message).join(',');
            throw error(400, 'BAD_REQUEST', 'bad request from client', message);
        } catch (err) {
            next(err);
        }
    };
};
