import { IRole } from "../interfaces/role.interface";
import { RoleRepository } from "../repository/role.repository";
import {
  AddModuleDTO,
  CreateRoleDTO,
  UpdateRoleDTO
} from "../validators/role.validator";
import { IRoleService } from "./i-role-service.interface";

export class RoleService implements IRoleService {
  private repository = new RoleRepository();

  async createRole(data: CreateRoleDTO): Promise<IRole> {
    return this.repository.create(data);
  }

  async getRole(id: string): Promise<IRole | null> {
    return this.repository.findById(id);
  }

  async getRoles(search?: string): Promise<IRole[]> {
    const filter = search
      ? { roleName: { $regex: search, $options: "i" } }
      : {};

    return this.repository.findAll(filter);
  }

  async updateRole(id: string, data: UpdateRoleDTO): Promise<IRole | null> {
    return this.repository.update(id, data);
  }

  async deleteRole(id: string): Promise<IRole | null> {
    return this.repository.delete(id);
  }

  async addModule(id: string, data: AddModuleDTO): Promise<IRole | null> {
    return this.repository.addAccessModule(id, data.module);
  }

  async removeModule(id: string, module: string): Promise<IRole | null> {
    return this.repository.removeAccessModule(id, module);
  }
}
