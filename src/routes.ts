import { Router } from 'express';

import tasks from '@app/app/routes/tasks';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    name: 'Api ts',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

routes.use(tasks);

export default routes;
