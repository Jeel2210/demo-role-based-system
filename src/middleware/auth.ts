import { NextFunction, Request, Response } from 'express';
import { verifyAccess } from '../common/utils';

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, message: 'Authorization header missing' });
  const token = header.split(' ')[1];
  try {
    const payload = verifyAccess(token);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
