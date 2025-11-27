import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

/**
 * validate: Middleware to validate request using Zod schema
 * @param schema - Zod schema object
 */
export const validate = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Combine req.body, req.query, req.params for validation
      const data = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      schema.parse(data); // will throw ZodError if validation fails
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: err,
        });
      }
      return next(err); // unexpected error
    }
  };
};
