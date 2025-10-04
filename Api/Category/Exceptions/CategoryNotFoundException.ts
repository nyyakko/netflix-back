import type HttpException from '../../../Exceptions/Core/HttpException.js';

export default class CategoryNotFoundException implements HttpException
{
    status: number = 404;
    code: string = 'CATEGORY_NOT_FOUND';
}
