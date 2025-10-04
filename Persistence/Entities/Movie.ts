import { DataTypes, Model, type CreationOptional, type NonAttribute, type InferAttributes, type InferCreationAttributes, type BelongsToManySetAssociationsMixin, type BelongsToManyGetAssociationsMixin } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, BelongsToMany } from '@sequelize/core/decorators-legacy';

import Genre from './Genre.js';

@Table({ tableName: 'movies' })
export default class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>>
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
    declare title: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare synopsis: string;

    @Attribute(DataTypes.DOUBLE)
    @NotNull
    declare rating: number;

    @Attribute(DataTypes.DATE)
    @NotNull
    declare releaseDate: Date;

    @BelongsToMany(() => Genre, { through: 'movie_genres' })
    declare categories?: NonAttribute<Genre[]>;

    declare setGenres: BelongsToManySetAssociationsMixin<Genre, Genre['id']>;
    declare getGenres: BelongsToManyGetAssociationsMixin<Genre>;
}
