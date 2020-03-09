import { Router } from 'express';

import UserMiddleware from '../middlewares/UserMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import RecipientMiddleWare from '../middlewares/RecipientMiddleWare';

import SessionControler from '../app/controllers/SessionController';
import RecipientController from '../app/controllers/RecipientController';
import UserController from '../app/controllers/UserController';

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
  RecipientMiddleWare.checkIfRecipientModelIsValid,
  RecipientController.store
);

routes.put(
  '/recipient',
  AuthMiddleware.validateToken,
  RecipientMiddleWare.checkIfRecipientExists,
  RecipientController.update
);

routes.post(
  '/users',
  UserMiddleware.checkIfUserNotExists,
  UserMiddleware.checkIfUserPasswordMatch,
  UserMiddleware.validateStoreUserModel,
  UserController.store
);

routes.put(
  '/users',
  AuthMiddleware.validateToken,
  UserMiddleware.checkIfUserExists,
  UserMiddleware.checkIfUserPasswordMatch,
  UserMiddleware.validateUpdateUserModel,
  UserController.update
);

export default routes;
