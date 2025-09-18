import { Umzug, SequelizeStorage } from 'umzug';

import * as Database from './Postgres.js';

const sequelize = Database.connect();

export const migrator = new Umzug({
    migrations: {
        glob: 'Migrations/*.ts'
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize, }),
    logger: console,
});

migrator.runAsCLI();
