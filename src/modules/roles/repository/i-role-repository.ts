import { IBaseRepository } from "../../../common/lib/base-repo/i-base-repo";
import { IRole } from "../interfaces/role.interface";

export interface IRoleRepository extends IBaseRepository<IRole>{
    addAccessModule(roleId: string, module: string): Promise<IRole | null>;
    removeAccessModule(roleId: string, module: string): Promise<IRole | null>;
}