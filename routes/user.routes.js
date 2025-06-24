import {Router} from 'express';
import { login } from '../controllers/user.controller.js';
import { register } from '../controllers/user.controller.js';
import { updateUserProfile } from '../controllers/user.controller.js';

const router=Router();


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user_update').post(updateUserProfile)



export default router