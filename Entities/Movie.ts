import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'movies', updatedAt: false })
export default class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>>
{
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare title: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare synopsis: string;

    @Attribute(DataTypes.DOUBLE)
    declare rating: CreationOptional<number>;

    @Attribute(DataTypes.DATE)
    @NotNull
    declare releaseDate: Date;
}
