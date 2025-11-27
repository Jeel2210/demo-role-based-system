import bcrypt from 'bcrypt';
import { config } from '../../config';

export const hash = (plain: string) => bcrypt.hash(plain, config.bcryptSaltRounds);
export const compare = (plain: string, hashed: string) => bcrypt.compare(plain, hashed);
