import { DataTypes, Model, type CreationOptional, type NonAttribute, type InferAttributes, type InferCreationAttributes, type BelongsToManySetAssociationsMixin, type BelongsToManyGetAssociationsMixin } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, BelongsToMany } from '@sequelize/core/decorators-legacy';

import Role from './Role.js';

@Table({ tableName: 'users' })
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>
{
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.DATE)
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    declare updatedAt: CreationOptional<Date>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare email: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare password: string;

    @BelongsToMany(() => Role, { through: 'user_roles' })
    declare roles?: NonAttribute<Role[]>;

    declare setRoles: BelongsToManySetAssociationsMixin<Role, Role['id']>;
    declare getRoles: BelongsToManyGetAssociationsMixin<Role>;
}
