import type Role from "../../../../Persistence/Entities/Role.js";

export default class RoleResponse
{
    id!: number;
    name!: string;

    static fromEntity(role: Role): RoleResponse
    {
        let response = new RoleResponse();

        response.id = role.get('id');
        response.name = role.get('name');

        return response;
    }
}
