import { IBaseRepository } from "../../../common/lib/base-repo/i-base-repo";
import { IUser } from "../interfaces/user.interface";

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  listWithPopulate(filter?: Record<string, any>, page?: number, limit?: number): Promise<IUser[]>;
}
