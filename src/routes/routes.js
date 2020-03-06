import { Router } from 'express';
import UserMiddleware from '../middlewares/UserMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

import SessionControler from '../app/controllers/SessionController';
import RecipientController from '../app/controllers/RecipientController';
import RecipientMiddleWare from '../middlewares/RecipientMiddleWare';

const routes = new Router();

routes.get('/appTest', (res, req) => {
  return req.status(200).json({ mesage: 'This application is running fine!' });
});

routes.post(
  '/session',
  UserMiddleware.checkIfUserExists,
  UserMiddleware.checkIfUserPasswordMatch,
  SessionControler.store
);

routes.post(
  '/recipient',
  AuthMiddleware.validateToken,
  RecipientMiddleWare.checkIfRecipientIsValid,
  RecipientController.store
);

export default routes;
