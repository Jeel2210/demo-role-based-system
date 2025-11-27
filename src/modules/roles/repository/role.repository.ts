import { BaseRepository } from "../../../common/lib/base-repo/base.repository";
import { IRole } from "../interfaces/role.interface";
import { RoleModel } from "../model/role.model";
import { IRoleRepository } from "./i-role-repository";

export class RoleRepository extends BaseRepository<IRole> implements IRoleRepository {
    constructor(){
        super(RoleModel)
    }
    removeAccessModule(roleId: string, module: string): Promise<IRole | null> {
        return RoleModel.findByIdAndUpdate(roleId,{
            $pull:{accessModules:module},
            
        },{
            new:true
        })
    }
    addAccessModule(roleId: string, module: string): Promise<IRole | null> {
        return RoleModel.findByIdAndUpdate(roleId,{
            $addToSet:{accessModules:module},
            
        },{
            new:true
        })
    }
    
}