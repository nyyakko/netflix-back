import { DataTypes, Model, type NonAttribute, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, BelongsToMany } from '@sequelize/core/decorators-legacy';
import type { BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin } from 'sequelize';

import Movie from './Movie.js';

@Table({ tableName: 'genres' })
export default class Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>>
{
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @BelongsToMany(() => Movie, { through: 'movie_genres' })
    declare movies?: NonAttribute<Movie[]>;
    declare setMovies: BelongsToManySetAssociationsMixin<Movie, Movie['id']>;
    declare getMovies: BelongsToManyGetAssociationsMixin<Movie>;
}
