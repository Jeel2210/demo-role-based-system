import { model, Schema } from "mongoose";
import { IRole } from "../interfaces/role.interface";

const RoleSchema = new Schema<IRole>({
    roleName:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    accessModules:{
        type:[String],
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

export const RoleModel= model<IRole>('Role',RoleSchema);