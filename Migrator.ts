import { Umzug, SequelizeStorage } from 'umzug';

import * as Database from './Infrastructure/Database.js';

const sequelize = Database.the();

export const migrator = new Umzug({
    migrations: {
        glob: 'Migrations/*.ts'
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize, }),
    logger: console,
});

migrator.runAsCLI();
