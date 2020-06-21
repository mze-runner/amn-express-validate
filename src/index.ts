import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from '@hapi/joi';
import error from 'amn-error';

// get all input from client
const _input = (req: Request) => {
    const { body, params, query } = req;
    return Object.assign({}, body, params, query);
};

export default (
    schema: ObjectSchema,
    container?: 'body' | 'query' | 'params'
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = !container ? _input(req) : req[container];
            const { error: validationError } = await schema.validate(input);
            const valid = validationError == null;
            if (valid) {
                return next();
            }
            const { details } = validationError!;
            const message = details.map((i) => i.message).join(',');
            throw error.create(400, 'BAD_REQUEST', message);
        } catch (err) {
            next(err);
        }
    };
};
