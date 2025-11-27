import { Request, Response } from "express";

export interface IUserController {
  signup(req: Request, res: Response): Promise<Response | void>;
  login(req: Request, res: Response): Promise<Response | void>;
  list(req: Request, res: Response): Promise<Response | void>;
  get(req: Request, res: Response): Promise<Response | void>;
  update(req: Request, res: Response): Promise<Response | void>;
  remove(req: Request, res: Response): Promise<Response | void>;
  checkAccess(req: Request, res: Response): Promise<Response | void>;
  bulkSame(req: Request, res: Response): Promise<Response | void>;
  bulkDifferent(req: Request, res: Response): Promise<Response | void>;
}
