import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import LoginRequest from '../../Contracts/Auth/Requests/LoginRequest.js';
import RegisterRequest from '../../Contracts/Auth/Requests/RegisterRequest.js';
import Role from '../../Entities/Role.js';
import User from '../../Entities/User.js';
import UserResponse from '../../Contracts/Auth/Responses/UserResponse.js';

import InvalidCredentialsException from './Exceptions/InvalidCredentialsException.js';
import UserAlreadyExistsException from './Exceptions/UserAlreadyExistsException.js';

export async function login({ email, password }: LoginRequest): Promise<string>
{
    const user = await User.findOne({ where: { email }, include: Role })

    if (!user) {
        throw new InvalidCredentialsException();
    }

    if (!await bcrypt.compare(password, user.password)) {
        throw new InvalidCredentialsException();
    }

    return jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.JWT_EXPIRES_IN!) });
}

export async function register({ name, email, password }: RegisterRequest): Promise<UserResponse>
{
    if (await User.findOne({ where: { name, email }})) {
        throw new UserAlreadyExistsException();
    }

    let role = await Role.findOne({ where: { name: 'USER' } });

    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10)});
    user.setRoles([role!.id]);

    return UserResponse.fromUser((await User.findOne({ where: { id: user.id }, include: Role }))!);
}
