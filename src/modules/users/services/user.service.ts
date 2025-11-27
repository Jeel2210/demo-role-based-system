import { compare as comparePassword, hash as hashPassword, signAccess } from '../../../common/utils';
import { RoleModel } from '../../roles';
import { IUserService } from '../interfaces';
import { IUser } from '../interfaces/user.interface';
import { UserRepository } from '../repository/user.repository';

export class UserService implements IUserService {
  private repo = new UserRepository();

  async signup(payload: any) {
    console.log(payload)
    
    const existing = await this.repo.findByEmail(payload.email);
    if (existing) throw new Error('Email already registered');
    const hashed = await hashPassword(payload.password);
    const created = await this.repo.create({ ...payload, password: hashed } as Partial<IUser>);
    return { id: created._id, email: created.email, firstName: created.firstName };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('Inva    lid credentials');
    const ok = await comparePassword(password, user.password);
    if (!ok) throw new Error('Invalid credentials');
    const payload = { id: user._id.toString(), email: user.email, role: user.role?.toString() };
    const accessToken = signAccess(payload);
    return { accessToken };
  }

  async list(q?: string, page = 1, limit = 20) {
    const filter: any = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ firstName: regex }, { lastName: regex }, { email: regex }];
    }
    return this.repo.listWithPopulate(filter, page, limit);
  }

  async getById(id: string) {
    return this.repo.findById(id);
  }

  async update(id: string, updateData: Partial<IUser>) {
    // don't update password here - keep separate
    if ((updateData as any).password) delete (updateData as any).password;
    return this.repo.update(id, updateData);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async checkAccess(userId: string, moduleName: string) {
    const user = await this.repo.findById(userId);
    if (!user) return false;
    // populate role to inspect accessModules
    const role = await RoleModel.findById(user.role).select('accessModules').lean();
    if (!role) return false;
    return (role.accessModules || []).includes(moduleName);
  }

  async bulkUpdateSame(filter: any, update: any) {
    // Example: set all lastName to "ABC"
    return this.repo.updateMany(filter || {}, { $set: update || {} });
  }

  async bulkUpdateDifferent(operations: any[]) {
    // operations should be array of updateOne/updateMany ops as required by bulkWrite
    return this.repo.bulkWrite(operations);
  }
}
