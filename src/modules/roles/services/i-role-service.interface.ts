import { IRole } from "../interfaces/role.interface";
import { AddModuleDTO, CreateRoleDTO, UpdateRoleDTO } from "../validators/role.validator";

export interface IRoleService {
  createRole(data: CreateRoleDTO): Promise<IRole>;
  getRole(id: string): Promise<IRole | null>;
  getRoles(search?: string): Promise<IRole[]>;
  updateRole(id: string, data: UpdateRoleDTO): Promise<IRole | null>;
  deleteRole(id: string): Promise<IRole | null>;
  addModule(id: string, data: AddModuleDTO): Promise<IRole | null>;
  removeModule(id: string, module: string): Promise<IRole | null>;
}
