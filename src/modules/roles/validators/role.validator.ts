export interface CreateRoleDTO {
  roleName: string;
}

export interface UpdateRoleDTO {
  roleName?: string;
  accessModules?: string[];
}

export interface AddModuleDTO {
  module: string;
}
