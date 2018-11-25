import * as express from 'express';
import {APIHelper} from '../../helpers/APIHelper';
import * as controller from './authController';

const router = express.Router();

router.post(
  '/signup',
  (req, res) => APIHelper(req, res, controller.signup)
);

router.post(
  '/login',
  (req, res) => APIHelper(req, res, controller.login)
);

export default router;

