import { Document, Types } from 'mongoose';
import { IRole } from '../../roles';

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role?: Types.ObjectId | IRole;
  createdAt: Date;
  updatedAt: Date;
}
