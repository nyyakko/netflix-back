import { DataTypes, Model, type NonAttribute, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, BelongsToMany } from '@sequelize/core/decorators-legacy';

import Movie from './Movie.js';

@Table({ tableName: 'categories' })
export default class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>>
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
    declare description: string;

    @BelongsToMany(() => Movie, { through: 'movie_categories' })
    declare movies?: NonAttribute<Category[]>;
}
