import UserRequest from "../../Contracts/User/Requests/UserRequest.js";
import User from "../../Entities/User.js";
import UserResponse from "../../Contracts/Auth/Responses/UserResponse.js";

import UserNotFoundException from "./Exceptions/UserNotFoundException.js";

export async function me({ name, email }: UserRequest): Promise<UserResponse>
{
    const user = await User.findOne({ where: { name, email }});

    if (!user) {
        throw new UserNotFoundException();
    }

    return UserResponse.fromUser(user);
}
