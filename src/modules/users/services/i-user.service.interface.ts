import { IUser } from "../interfaces/user.interface";

export interface IUserService {
  signup(payload: any): Promise<Partial<IUser>>;
  login(email: string, password: string): Promise<{ accessToken: string }>;
  list(q?: string, page?: number, limit?: number): Promise<IUser[]>;
  getById(id: string): Promise<IUser | null>;
  update(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<IUser | null>;
  checkAccess(userId: string, moduleName: string): Promise<boolean>;
  bulkUpdateSame(filter: any, update: any): Promise<any>;
  bulkUpdateDifferent(operations: any[]): Promise<any>;
}
