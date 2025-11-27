import { BaseRepository } from '../../../common/lib/base-repo/base.repository';
import { IUser } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { IUserRepository } from './i-user.repository.interface';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }

   async listWithPopulate(filter: Record<string, any> = {}, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return UserModel.find(filter)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .populate({ path: 'role', select: 'roleName accessModules' })
      .exec();
  }
}
