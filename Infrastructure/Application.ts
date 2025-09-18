import bcrypt from 'bcryptjs';

import Role from '../Entities/Role.js';
import User from '../Entities/User.js';

async function createRoles()
{
    const findOrCreate = async (value: any) => {
        return await Role.findOne({ where: value }) || await Role.create(value);
    };

    return [
        await findOrCreate({ name: 'ADMIN' }),
        await findOrCreate({ name: 'USER' })
    ];
}

async function createAdmin(roles: Role[]) {
    const user = {
        name: process.env.ADMIN_USERNAME!,
        email: process.env.ADMIN_EMAIL!,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)
    };

    const admin = await User.findOne({ where: { name: user.name, email: user.email }}) || await User.create({ ...user });

    admin.setRoles(roles.map(role => role.id));
}

export async function configure()
{
    const roles = await createRoles();
    await createAdmin(roles);
}
