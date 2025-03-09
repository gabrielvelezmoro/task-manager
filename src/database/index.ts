import { Sequelize } from 'sequelize';
import { databaseConfig } from '@config/database';

/**
 * Models Sequelize
 */

import Tasks from '@app/app/models/tasks';

class Database {
  public connection: any;

  public models = [Tasks];

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
    this.models
      .map(model => model.initialize(this.connection))
      .map((model: any) => model.associate?.(this.connection.models));
  }
}

export default new Database();
