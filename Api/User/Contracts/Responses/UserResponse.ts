import User from '../../../../Persistence/Entities/User.js';
import RoleResponse from '../../../Role/Contracts/Responses/RoleResponse.js';

export default class UserResponse
{
    id!: number;
    name!: string;
    email!: string;
    roles!: RoleResponse[];

    static async fromEntity(user: User): Promise<UserResponse>
    {
        let response = new UserResponse();

        response.id = user.get('id');
        response.name = user.get('name');
        response.email = user.get('email');

        const roles = await user.getRoles();
        response.roles = roles.map(RoleResponse.fromEntity);

        return response;
    }
}
