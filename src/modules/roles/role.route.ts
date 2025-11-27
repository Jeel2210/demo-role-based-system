import { Router } from "express";
import { RoleController } from "./controllers/role.controller";

const router = Router();
const controller = new RoleController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.post("/:id/module", controller.addModule);
router.delete("/:id/module/:module", controller.removeModule);

export const RoleRoute= router;
