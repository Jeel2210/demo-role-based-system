import { NextFunction, Request, Response } from "express";

export const catchAsync = <
  Fn extends (req: Request, res: Response) => Promise<any>
>(
  fn: Fn
): Fn => {
  const wrapped = (async function (req: Request, res: Response) {
    const next = (arguments as any)[2] as NextFunction | undefined;
    try {
      return await fn(req, res);
    } catch (err) {
      if (typeof next === "function") return next(err);
      throw err;
    }
  }) as unknown as Fn;

  return wrapped;
};
