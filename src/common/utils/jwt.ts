import jwt from 'jsonwebtoken';
import { config } from '../../config';

export const signAccess = (payload: object) =>
  jwt.sign(payload,config.jwtSecret, { expiresIn: '7d' });

export const verifyAccess = (token: string) =>
  jwt.verify(token, config.jwtSecret) as any;
