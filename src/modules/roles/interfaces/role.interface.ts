export interface IRole extends Document{
    roleName:string;
    accessModules:string[];
    createdAt:Date|string;
    isActive:boolean;
}