import type Role from '../../../Entities/Role.js';

export default class RoleResponse
{
    id!: number;
    name!: string;

    static fromRole(role: Role): RoleResponse
    {
        let response = new RoleResponse();

        response.id = role.get('id');
        response.name = role.get('name');

        return response;
    }
}
