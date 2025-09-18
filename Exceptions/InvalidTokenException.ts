import type HttpException from "./Core/HttpException.js";

export default class InvalidTokenException implements HttpException
{
    code: string = 'INVALID_TOKEN';
}
