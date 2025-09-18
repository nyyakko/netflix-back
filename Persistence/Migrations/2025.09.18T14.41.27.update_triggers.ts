import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.query(`
        CREATE FUNCTION update_updatedat_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updatedAt = CURRENT_TIMESTAMP;
            return NEW;
        END;
        $$ language 'plpgsql'
    `);

    await Promise.all([
        sequelize.query(`CREATE TRIGGER update_updatedat BEFORE UPDATE ON user_roles FOR EACH ROW EXECUTE PROCEDURE update_updatedat_column()`),
        sequelize.query(`CREATE TRIGGER update_updatedat BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_updatedat_column()`),
        sequelize.query(`CREATE TRIGGER update_updatedat BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updatedat_column()`),
        sequelize.query(`CREATE TRIGGER update_updatedat BEFORE UPDATE ON movies FOR EACH ROW EXECUTE PROCEDURE update_updatedat_column()`)
    ]);
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await Promise.all([
        sequelize.query('DROP TRIGGER IF EXISTS update_updatedat ON user_roles'),
        sequelize.query('DROP TRIGGER IF EXISTS update_updatedat ON roles'),
        sequelize.query('DROP TRIGGER IF EXISTS update_updatedat ON users'),
        sequelize.query('DROP TRIGGER IF EXISTS update_updatedat ON movies'),
        sequelize.query('DROP FUNCTION IF EXISTS update_updatedat_column()')
    ]);
}
