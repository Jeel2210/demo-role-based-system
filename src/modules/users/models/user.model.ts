import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true, index: true },
    lastName: { type: String, trim: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: false },
  },
  { timestamps: true }
);

// text index for search (firstName, lastName, email)
UserSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

export const UserModel = mongoose.model<IUser>('UserData',UserSchema);
