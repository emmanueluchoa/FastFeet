import { Router } from 'express';

const routes = new Router();

routes.get('/appTest', (res, req) => {
  return req.status(200).json({ mesage: 'This application is running fine!' });
});

export default routes;
