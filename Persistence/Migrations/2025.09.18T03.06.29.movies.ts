import { DataTypes, literal } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.createTable('movies', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        synopsis: {
            type: DataTypes.STRING({ length: 1024 }),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        popularity: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        original: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        posterPath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        backdropPath: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.dropTable('movies');
}
