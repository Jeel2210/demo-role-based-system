import { Request, Response } from "express";
import { logger } from "../../../common";
import { catchAsync } from "../../../common/utils/catch";
import { RoleService } from "../services/role.service";
import { IRoleController } from "./i-role-controller.interface";

export class RoleController implements IRoleController {
  private service = new RoleService();

  create = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(`[RoleController] create role body=${JSON.stringify(req.body)}`);
    
    const result = await this.service.createRole(req.body);
    res.status(201).json({ success: true, data: result });
  });

  getOne = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(`[RoleController] getOne id=${req.params.id}`);

    const result = await this.service.getRole(req.params.id);
    res.json({ success: true, data: result });
  });

  getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(`[RoleController] getAll search=${req.query.search}`);

    const result = await this.service.getRoles(req.query.search as string);
    res.json({ success: true, data: result });
  });

  update = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(
      `[RoleController] update id=${req.params.id} body=${JSON.stringify(req.body)}`
    );

    const result = await this.service.updateRole(req.params.id, req.body);
    res.json({ success: true, data: result });
  });

  delete = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(`[RoleController] delete id=${req.params.id}`);

    const result = await this.service.deleteRole(req.params.id);
    res.json({ success: true, data: result });
  });

  addModule = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(
      `[RoleController] addModule roleId=${req.params.id} body=${JSON.stringify(req.body)}`
    );

    const result = await this.service.addModule(req.params.id, req.body);
    res.json({ success: true, data: result });
  });

  removeModule = catchAsync(async (req: Request, res: Response): Promise<void> => {
    logger.info(
      `[RoleController] removeModule roleId=${req.params.id} module=${req.params.module}`
    );

    const result = await this.service.removeModule(req.params.id, req.params.module);
    res.json({ success: true, data: result });
  });
}
