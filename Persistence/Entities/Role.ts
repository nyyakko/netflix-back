import { DataTypes, Model, type CreationOptional, type NonAttribute, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, ValidateAttribute, PrimaryKey, AutoIncrement, NotNull, Table, BelongsToMany } from '@sequelize/core/decorators-legacy';

import User from './User.js';

@Table({ tableName: 'roles' })
export default class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>
{
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @ValidateAttribute({ isIn: [['USER', 'ADMIN']] })
    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @BelongsToMany(() => User, { through: 'user_roles' })
    declare users?: NonAttribute<User[]>;
};
