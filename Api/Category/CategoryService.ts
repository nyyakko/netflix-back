import Category from '../../Persistence/Entities/Category.js';
import CategoryRequest from './Contracts/Requests/CategoryRequest.js';
import CategoryResponse from './Contracts/Responses/CategoryResponse.js';

import CategoryAlreadyExistsException from './Exceptions/CategoryAlreadyExistsException.js';
import CategoryNotFoundException from './Exceptions/CategoryNotFoundException.js';

export async function save({ name, description }: CategoryRequest): Promise<CategoryResponse>
{
    if (await Category.findOne({ where: { name }})) {
        throw new CategoryAlreadyExistsException();
    }

    const category = await Category.create({ name, description });

    return CategoryResponse.fromCategory(category!);
}

export async function removeById(id: number)
{
    await Category.destroy({ where: { id } });
}

export async function get(page: number, limit: number): Promise<CategoryResponse[]>
{
    const { rows } = await Category.findAndCountAll({
        limit: limit,
        offset: (page-1) * limit,
        order: [['createdAt', 'DESC']]
    });

    return rows.map(CategoryResponse.fromCategory);
}

export async function getById(id: number): Promise<CategoryResponse>
{
    const category = await Category.findByPk(id);

    if (!category) {
        throw new CategoryNotFoundException();
    }

    return CategoryResponse.fromCategory(category!);
}
