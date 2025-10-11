import { Umzug, SequelizeStorage } from 'umzug';

import sequelize from '../Persistence/Sequelize.js'

export const migrator = new Umzug({
    migrations: {
        glob: 'Persistence/Migrations/*.ts'
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize, }),
    logger: console,
});

migrator.runAsCLI();
