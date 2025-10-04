import Category from '../../../../Persistence/Entities/Category.js';

export default class CategoryResponse
{
    id!: number;
    name!: string;
    description!: string;

    static fromCategory(category: Category): CategoryResponse
    {
        let response = new CategoryResponse();

        response.id = category.get('id');
        response.name = category.get('name');
        response.description = category.get('description');

        return response;
    }
}
