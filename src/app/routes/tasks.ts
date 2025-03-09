import { Router } from 'express';

/**
 * Controllers
 */
import TasksController from '@app/app/controllers/taskController';

const routes = Router();

routes.get(
  '/tasks',

  TasksController.index,
);

routes.get(
  '/tasks/:id',

  TasksController.get,
);

routes.post(
  '/tasks',

  TasksController.store,
);

routes.put(
  '/tasks/:id',

  TasksController.update,
);

routes.delete(
  '/tasks/:id',

  TasksController.delete,
);

export default routes;
