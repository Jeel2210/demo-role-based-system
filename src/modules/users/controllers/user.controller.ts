// controllers/user.controller.ts
import { Request, Response } from "express";
import { logger } from "../../../common";
import { catchAsync } from "../../../common/utils/catch";
import { IUserController } from "../interfaces";
import { UserService } from "../services/user.service";

export class UserController implements IUserController {
  private service = new UserService();

  signup = catchAsync(async (req: Request, res: Response) => {
    logger.info(`[UserController] signup body=${JSON.stringify(req.body)}`);

    const data = await this.service.signup(req.body);
    return res.status(201).json({ success: true, data });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    logger.info(
      `[UserController] login email=${req.body.email} password=***`
    );

    const { email, password } = req.body;
    const data = await this.service.login(email, password);
    return res.json({ success: true, data });
  });

  list = catchAsync(async (req: Request, res: Response) => {
    logger.info(
      `[UserController] list q=${req.query.q} page=${req.query.page} limit=${req.query.limit}`
    );

    const { q, page = "1", limit = "20" } = req.query as any;
    const users = await this.service.list(q, Number(page), Number(limit));
    return res.json({ success: true, data: users });
  });

  get = catchAsync(async (req: Request, res: Response) => {
    logger.info(`[UserController] get id=${req.params.id}`);

    const user = await this.service.getById(req.params.id);
    return res.json({ success: true, data: user });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    logger.info(
      `[UserController] update id=${req.params.id} body=${JSON.stringify(req.body)}`
    );

    const user = await this.service.update(req.params.id, req.body);
    return res.json({ success: true, data: user });
  });

  remove = catchAsync(async (req: Request, res: Response) => {
    logger.info(`[UserController] remove id=${req.params.id}`);

    await this.service.delete(req.params.id);
    return res.json({ success: true, message: "Deleted" });
  });

  checkAccess = catchAsync(async (req: Request, res: Response) => {
    logger.info(
      `[UserController] checkAccess userId=${req.params.userId} module=${req.query.module}`
    );

    const moduleName = req.query.module as string;
    if (!moduleName)
      return res
        .status(400)
        .json({ success: false, message: "module query required" });

    const has = await this.service.checkAccess(req.params.userId, moduleName);
    return res.json({ success: true, data: { has } });
  });

  bulkSame = catchAsync(async (req: Request, res: Response) => {
    logger.info(
      `[UserController] bulkSame filter=${JSON.stringify(
        req.body.filter
      )} update=${JSON.stringify(req.body.update)}`
    );

    const { filter, update } = req.body;
    const result = await this.service.bulkUpdateSame(filter, update);
    return res.json({ success: true, data: result });
  });

  bulkDifferent = catchAsync(async (req: Request, res: Response) => {
    logger.info(
      `[UserController] bulkDifferent operations=${JSON.stringify(
        req.body.operations
      )}`
    );

    const { operations } = req.body;
    const result = await this.service.bulkUpdateDifferent(operations);
    return res.json({ success: true, data: result });
  });
}
