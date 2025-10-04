import User from "../../Persistence/Entities/User.js";
import UserRequest from "./Contracts/Requests/UserRequest.js";
import UserResponse from "./Contracts/Responses/UserResponse.js";

import UserNotFoundException from "./Exceptions/UserNotFoundException.js";

export async function me({ name, email }: UserRequest): Promise<UserResponse>
{
    const user = await User.findOne({ where: { name, email }});

    if (!user) {
        throw new UserNotFoundException();
    }

    return UserResponse.fromEntity(user);
}
