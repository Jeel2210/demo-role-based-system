import { Router } from 'express';
import { auth, validate } from '../../middleware';
import { UserController } from './controllers/user.controller';
import { bulkDifferentSchema, bulkSameSchema, listUsersSchema, loginSchema, signupSchema } from './validators/user.dto';

const router = Router();
const controller = new UserController();

router.post('/signup', validate(signupSchema), controller.signup);
router.post('/login', validate(loginSchema), controller.login);

router.get('/', auth, validate(listUsersSchema), controller.list);
router.get('/:id', auth, controller.get);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

router.get('/:userId/access/check', auth, controller.checkAccess);

router.post('/bulk/updateSame', auth, validate(bulkSameSchema), controller.bulkSame);
router.post('/bulk/updateDifferent', auth, validate(bulkDifferentSchema), controller.bulkDifferent);

export const UserRoute= router;
